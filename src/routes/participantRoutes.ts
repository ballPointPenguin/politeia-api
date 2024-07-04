import type { FastifyInstance } from 'fastify'
import {
  getParticipant,
  listParticipants
} from '../controllers/participantController'

export default async function participantRoutes(app: FastifyInstance) {
  app.get('/', listParticipants)
  app.get('/:pid', getParticipant)

  return Promise.resolve()
}
