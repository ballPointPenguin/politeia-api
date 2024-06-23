import type { FastifyInstance } from 'fastify'
import { getUser, listUsers } from '../controllers/userController'

function userRoutes(app: FastifyInstance) {
  app.get('/', listUsers)
  app.get('/:uid', getUser)
}

export default userRoutes
