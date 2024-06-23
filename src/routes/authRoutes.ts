import type { FastifyInstance } from 'fastify'
import {
  handleGoogleAuth,
  handleLogout,
  handleVerify
} from '../controllers/authController'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/google', handleGoogleAuth)
  app.post('/logout', handleLogout)
  app.get('/verify', handleVerify)

  return Promise.resolve()
}
