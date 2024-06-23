import type { FastifyInstance } from 'fastify'
import { getUser, listUsers } from '../controllers/userController'

export default async function userRoutes(app: FastifyInstance) {
  app.get('/', listUsers)
  app.get('/:uid', getUser)

  return Promise.resolve()
}
