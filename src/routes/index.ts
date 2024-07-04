import type { FastifyInstance } from 'fastify'
import { authMiddleware } from '../middleware/authMiddleware'
import authRoutes from './authRoutes'
import conversationRoutes from './conversationRoutes'
import participantRoutes from './participantRoutes'
import userRoutes from './userRoutes'

export default async function routes(app: FastifyInstance) {
  await app.register(authRoutes, { prefix: '/auth' })

  await app.register(conversationRoutes, {
    prefix: '/conversations',
    prehandler: authMiddleware
  })

  await app.register(participantRoutes, {
    prefix: '/participants',
    prehandler: authMiddleware
  })

  await app.register(userRoutes, {
    prefix: '/users',
    prehandler: authMiddleware
  })
}
