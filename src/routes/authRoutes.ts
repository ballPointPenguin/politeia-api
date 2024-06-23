import type { FastifyInstance } from 'fastify'
import { handleGoogleAuth, handleLogout } from '../controllers/authController'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/google', handleGoogleAuth)
  app.post('/logout', handleLogout)

  return Promise.resolve()
}
