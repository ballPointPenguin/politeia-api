import type { FastifyInstance } from 'fastify'
import { handleGoogleAuth } from '../controllers/authController'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/google', handleGoogleAuth)

  return Promise.resolve()
}
