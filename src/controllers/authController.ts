import type { FastifyRequest, FastifyReply } from 'fastify'
import type { TokenPayload } from 'google-auth-library'
import { verifyGoogleToken } from '../auth/google'

export const handleGoogleAuth = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { token } = request.body as { token: string }

  try {
    const userData = await verifyGoogleToken(token)

    const { email, name, sub } = userData as TokenPayload

    request.session.user = {
      email,
      name,
      sub
    }

    return reply.send({ message: 'Authentication successful', user: userData })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return reply
      .status(401)
      .send({ message: 'Authentication failed', error: message })
  }
}

export const handleLogout = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.session.destroy()
  } catch (error) {
    return reply.status(500).send({ message: 'Logout failed' })
  }

  return reply.send({ message: 'Logged out successfully' })
}

export const handleVerify = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.session.user

  // TODO - Integrate AuthMiddleware prehandler into this route
  if (!user) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  return reply.send({ message: 'Verified', user })
}
