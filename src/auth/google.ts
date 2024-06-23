import type { TokenPayload } from 'google-auth-library'
import { OAuth2Client } from 'google-auth-library'
import env from '../env'

const { googleClientId } = env
const client = new OAuth2Client(googleClientId)

// Verify the Google ID Token
export const verifyGoogleToken = async (
  idToken: string
): Promise<TokenPayload | undefined> => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: googleClientId
  })

  const payload = ticket.getPayload()

  if (!payload) throw new Error('Google token verification failed')

  return payload
}
