import { OAuth2Client } from 'google-auth-library'
import { data } from 'react-router'

export async function createAuthorizeUrl() {
  // const redirectUrl = 'http://127.0.0.1:5173/gallery'
  const redirectUrl = 'http://localhost:5173/gallery'

  // authenticates client
  const client = createOAuthClient(redirectUrl)
  // console.log({ client })

  const authorizeUrl = client.generateAuthUrl({
    // For testing. Forces a url to be generated
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
    prompt: 'consent'
  })
  // console.log({ authorizeUrl })

  // Send a URL for users to use when pinging Google
  return { url: authorizeUrl }
}

export async function getAuthorizedUserData(code: string | undefined) {
  // get code from client
  if (!code) {
    return { status: 400, message: 'need token' }
  }

  try {
    // must match google's
    const redirectUrl = 'http://localhost:5173/gallery'

    // create secure client from our end
    const client = createOAuthClient(redirectUrl)

    const res = await client.getToken(code)

    await client.setCredentials(res.tokens)

    const user = client.credentials

    if (user.access_token === null) {
      return { status: 400, message: 'access token not granted' }
    }

    const userData = await getUserData(user.access_token)

    return userData
  } catch (error) {
    console.log('Signing in with google error', error)
  }
}

export async function getUserData(access_token: string | undefined) {
  if (!access_token) {
    return { status: 400, message: 'need token' }
  }
  // send our token to google
  try {
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    ).then(res => res.json())
    return res
  } catch (error) {
    console.log('error in the getUserData function!', error)
  }
}

function createOAuthClient(redirectUrl: string) {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl
  )
}
