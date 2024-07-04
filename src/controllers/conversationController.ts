import type { FastifyRequest, FastifyReply } from 'fastify'
import type { RequestQuery } from '../types'
import { AppDataSource } from '../config/database'
import { Conversation } from '../entities/Conversation'

export const listConversations = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    page = 1,
    limit = 50,
    sort = 'zid',
    order = 'ASC'
    // ...filters
  } = request.query as RequestQuery

  const conversationRepo = AppDataSource.getRepository(Conversation)
  const alias = conversationRepo.metadata.targetName
  const skip = (page - 1) * limit
  const queryBuilder = conversationRepo.createQueryBuilder(alias)

  // Apply filters (TODO)

  // Apply sorting
  queryBuilder.orderBy(`${alias}.${sort}`, order)

  // Apply pagination
  queryBuilder.skip(skip).take(limit)

  const [conversations, total] = await queryBuilder.getManyAndCount()

  return reply.send({
    data: conversations,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  })
}

export const getConversation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const conversationRepo = AppDataSource.getRepository(Conversation)
  const { zid } = request.params as { zid: string }

  const conversation = await conversationRepo.findOneBy({
    zid: parseInt(zid, 10)
  })

  if (conversation) {
    return reply.send(conversation)
  } else {
    return reply.status(404).send({ message: 'Conversation not found' })
  }
}
