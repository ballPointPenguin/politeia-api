import type { FastifyInstance } from 'fastify'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'

export default async function routes(app: FastifyInstance) {
  await app.register(authRoutes, { prefix: '/auth' })
  await app.register(userRoutes, { prefix: '/users' })
}
