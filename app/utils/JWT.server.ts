// authSession.server.ts
import jwt from 'jsonwebtoken'
import { createCookieSessionStorage } from 'react-router'
import { db } from '~/db'
import { users } from '~/db/schema'
import { eq } from 'drizzle-orm'
import type { UserObject } from './googleAuth.server'

export function createSessionHelpers() {
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET required in ENV file')
  }
  const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<{ jwt: string }, { error: string }>({
      cookie: {
        name: 'auth_session',
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60, // 1 hour in seconds (!set to 60 * 60)
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET], // for session signing
        secure: process.env.NODE_ENV === 'production' // allow http in dev
      }
    })
  return { getSession, commitSession, destroySession }
}

// Create signed JWT for user
function createToken(googleId: string, role?: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET required in ENV file')
  }

  return jwt.sign({ googleId, role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

// Decode a JWT and return googleId + role
export function decodeToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('Secret needed to validate JWT')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decoded === 'object' && decoded && 'googleId' in decoded) {
      return {
        googleId: decoded.googleId as string,
        role: decoded.role as string | undefined
      }
    }
    return undefined
  } catch (err) {
    console.error('Invalid or expired token', err)
    return undefined
  }
}

// Create a session and store it as a cookie
export async function storeUserSession(googleId: string, role?: string) {
  const { getSession, commitSession } = createSessionHelpers()
  const token = createToken(googleId, role)
  const session = await getSession()
  session.set('jwt', token)
  return await commitSession(session)
}

// Verify a user session, return DB user is active
export async function getUserFromSession(cookieHeader?: string) {
  const { getSession } = createSessionHelpers()
  if (!cookieHeader) return undefined

  const session = await getSession(cookieHeader)
  const token = session.get('jwt')
  if (!token) return undefined

  const decoded = decodeToken(token)
  if (!decoded) return undefined

  // Get user from DB
  const user = await db
    .select()
    .from(users)
    .where(eq(users.googleId, decoded.googleId))
    .get()

  if (!user) return undefined
  if (user.status !== 'active') return undefined // banned or disabled
  const { googleId, email, name, picture } = user

  return { sub: googleId, email, name, picture }
}

// Remove user JWT cookie
export async function destroyUserSession(cookieHeader: string | null) {
  const { getSession, destroySession } = createSessionHelpers()
  const session = await getSession(cookieHeader)
  return await destroySession(session)
}

export async function banUser(userId: string) {
  await db
    .update(users)
    .set({ status: 'disabled', role: 'banned' })
    .where(eq(users.id, userId))
}
