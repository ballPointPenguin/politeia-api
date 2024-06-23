import type {
  FastifyRequest,
  FastifyReply,
  preHandlerAsyncHookHandler
} from 'fastify'

export const authMiddleware: preHandlerAsyncHookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.session.user

  if (!user) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
  return reply
}
