import type { FastifyRequest, FastifyReply } from 'fastify'
import type { RequestQuery } from '../types'
import { AppDataSource } from '../config/database'
import { Participant } from '../entities/Participant'

export const listParticipants = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    page = 1,
    limit = 50,
    sort = 'pid',
    order = 'ASC'
    // ...filters
  } = request.query as RequestQuery

  const participantRepo = AppDataSource.getRepository(Participant)
  const alias = participantRepo.metadata.targetName
  const skip = (page - 1) * limit
  const queryBuilder = participantRepo.createQueryBuilder(alias)

  // Apply filters (TODO)

  // Apply sorting
  queryBuilder.orderBy(`${alias}.${sort}`, order)

  // Apply pagination
  queryBuilder.skip(skip).take(limit)

  const [participants, total] = await queryBuilder.getManyAndCount()

  return reply.send({
    data: participants,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  })
}

export const getParticipant = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const participantRepo = AppDataSource.getRepository(Participant)
  const { pid } = request.params as { pid: string }

  const participant = await participantRepo.findOneBy({
    pid: parseInt(pid, 10)
  })

  if (participant) {
    return reply.send(participant)
  } else {
    return reply.status(404).send({ message: 'Participant not found' })
  }
}
