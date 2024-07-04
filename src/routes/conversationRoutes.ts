import type { FastifyInstance } from 'fastify'
import {
  getConversation,
  listConversations
} from '../controllers/conversationController'

export default async function conversationRoutes(app: FastifyInstance) {
  app.get('/', listConversations)
  app.get('/:zid', getConversation)

  return Promise.resolve()
}
