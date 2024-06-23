import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyGoogleToken } from '../auth/google'

export const handleGoogleAuth = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { token } = request.body as { token: string }

  try {
    const userData = await verifyGoogleToken(token)
    return reply.send({ message: 'Authentication successful', user: userData })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return reply
      .status(401)
      .send({ message: 'Authentication failed', error: message })
  }
}
