import { OAuth2Client } from 'google-auth-library'
import { db } from '../db'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'
import { isAdminUser } from './admin.server'

export type UserObject = {
  sub: string
  email: string
  name: string
  given_name?: string
  family_name?: string
  picture: string
  id: string
  status: 'active' | 'disabled'
  role: 'user' | 'admin'
}

export type GoogleAuthResponse = {
  sub: string
  email: string
  name: string
  given_name?: string
  family_name?: string
  picture: string
}

type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string }

function createError(status: number, message: string): ServiceResult<never> {
  return { ok: false, status, message }
}

function createOAuthClient(redirectUrl: string) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error(
      'Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment variables'
    )
  }
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl
  )
}

export async function createAuthorizeUrl(): Promise<
  ServiceResult<{ url: string }>
> {
  try {
    if (!process.env.REDIRECT_URL) {
      throw new Error('Missing REDIRECT_URL in environment variables')
    }

    // authenticates client
    const client = createOAuthClient(process.env.REDIRECT_URL)
    // Send a URL for users to use when pinging Google
    const authorizeUrl = client.generateAuthUrl({
      // For testing. Forces a url to be generated
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile openid email',
      prompt: 'consent'
    })
    return { ok: true, data: { url: authorizeUrl } }
  } catch (error) {
    console.error('Error creating authorize URL:', error)
    return createError(500, 'Failed to generate authorize URL')
  }
}

export async function getAuthorizedUserData(
  code?: string | undefined
): Promise<ServiceResult<GoogleAuthResponse>> {
  // get code from client
  if (!code) return createError(400, 'Missing authorization code')
  if (!process.env.REDIRECT_URL)
    throw new Error('Missing REDIRECT_URL in environment variables')

  try {
    // create secure client from our end
    const client = createOAuthClient(process.env.REDIRECT_URL)

    const { tokens } = await client.getToken(code)
    if (!tokens.access_token)
      return createError(400, 'Access token not granted')

    // This IS async
    await client.setCredentials(tokens)

    return await getGoogleUserData(tokens.access_token)
  } catch (error) {
    console.error('Error signing in with Google:', error)
    return createError(500, 'Google sign-in failed')
  }
}

async function getGoogleUserData(
  access_token?: string
): Promise<ServiceResult<GoogleAuthResponse>> {
  if (!access_token) return createError(400, 'Missing access token')
  // send our token to google
  try {
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    )

    if (!res.ok) {
      return createError(res.status, `Google API error: ${res.statusText}`)
    }
    const userData: GoogleAuthResponse = await res.json()
    return { ok: true, data: userData }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return createError(500, 'Failed to fetch user data')
  }
}

// Get's user data from googleApi and stores or updates info in DB
export async function handleGoogleOAuth(code: string) {
  if (!process.env.REDIRECT_URL)
    throw new Error('Missing REDIRECT_URL in environment variables')
  const client = createOAuthClient(process.env.REDIRECT_URL)

  // Exchange code for tokens
  const { tokens } = await client.getToken(code)
  if (!tokens.access_token)
    return createError(400, 'Access token not given by Google')

  // Get profile info
  const profile = await getGoogleUserData(tokens.access_token)

  if (!profile.ok) {
    return createError(500, 'Google API error while getting user Data')
  }

  const { sub, email, name, picture } = profile.data

  let userData

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.googleId, sub))
    .get()

  if (existingUser) {
    const { id, name, picture, role } = existingUser
    await db
      .update(users)
      .set({
        lastLoginAt: new Date().toISOString()
      })
      .where(eq(users.googleId, sub))
    userData = { id, name, picture, role }
  } else {
    // check if id is on the whitelist
    const admin = isAdminUser(sub)
    try {
      const newUser = await db
        .insert(users)
        .values({
          googleId: sub,
          email: email,
          name: name,
          picture: picture,
          lastLoginAt: new Date().toISOString(),
          role: admin ? 'admin' : 'user'
        })
        .returning({
          id: users.id,
          name: users.name,
          picture: users.picture,
          role: users.role
        })
      userData = newUser[0]
    } catch (error) {
      console.log('error in adding new User')
      return createError(500, 'Internal error adding user')
    }
  }
  return { ok: true, data: userData }
}
