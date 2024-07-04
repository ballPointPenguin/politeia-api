import type { FastifyRequest, FastifyReply } from 'fastify'
import type { RequestQuery } from '../types'
import { AppDataSource } from '../config/database'
import { Participant } from '../entities/Participant'

type SortBy =
  | 'pid'
  | 'uid'
  | 'zid'
  | 'voteCount'
  | 'lastInteraction'
  | 'subscribed'
  | 'lastNotified'
  | 'mod'
  | 'nsli'
  | 'created'

interface ParticipantRequestQuery extends RequestQuery {
  sort: SortBy
}

export const listParticipants = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    cursor,
    limit = 50,
    sort = 'zid',
    order = 'ASC'
    // ...filters
  } = request.query as ParticipantRequestQuery

  const secondarySort = sort === 'pid' ? 'zid' : 'pid'
  const participantRepo = AppDataSource.getRepository(Participant)
  const alias = participantRepo.metadata.targetName
  const take = parseInt(String(limit)) || 50

  const queryBuilder = participantRepo.createQueryBuilder(alias)

  // Apply filters (TODO)

  // Apply sorting
  queryBuilder
    .orderBy(`${alias}.${sort}`, order)
    .addOrderBy(`${alias}.${secondarySort}`, order)

  // Apply cursor-based pagination
  if (cursor) {
    const [lastPrimary, lastSecondary] = cursor.split('_').map(Number)
    if (order.toUpperCase() === 'ASC') {
      queryBuilder.andWhere(
        `${alias}.${sort} > :lastPrimary OR (${alias}.${sort} = :lastPrimary AND ${alias}.${secondarySort} > :lastSecondary)`,
        { lastPrimary, lastSecondary }
      )
    } else {
      queryBuilder.andWhere(
        `${alias}.${sort} < :lastPrimary OR (${alias}.${sort} = :lastPrimary AND ${alias}.${secondarySort} < :lastSecondary)`,
        { lastPrimary, lastSecondary }
      )
    }
  }

  queryBuilder.take(take)

  const participants = await queryBuilder.getMany()
  const nextCursor =
    participants.length > 0
      ? `${participants[participants.length - 1][sort]}_${participants[participants.length - 1][secondarySort]}`
      : null

  // Calculate prevCursor
  let prevCursor = null
  if (participants.length > 0) {
    const reverseQueryBuilder = participantRepo.createQueryBuilder(alias)

    reverseQueryBuilder
      .orderBy(`${alias}.${sort}`, order === 'ASC' ? 'DESC' : 'ASC')
      .addOrderBy(`${alias}.${secondarySort}`, order === 'ASC' ? 'DESC' : 'ASC')
      .take(take)

    const reverseCursor = `${participants[0][sort]}_${participants[0][secondarySort]}`

    if (reverseCursor) {
      const [reversePid, reverseSecondary] = reverseCursor
        .split('_')
        .map(Number)
      if (order.toUpperCase() === 'ASC') {
        reverseQueryBuilder.andWhere(
          `${alias}.${sort} < :reversePid OR (${alias}.${sort} = :reversePid AND ${alias}.${secondarySort} < :reverseSecondary)`,
          { reversePid, reverseSecondary }
        )
      } else {
        reverseQueryBuilder.andWhere(
          `${alias}.${sort} > :reversePid OR (${alias}.${sort} = :reversePid AND ${alias}.${secondarySort} > :reverseSecondary)`,
          { reversePid, reverseSecondary }
        )
      }

      const reverseParticipants = await reverseQueryBuilder.getMany()
      prevCursor =
        reverseParticipants.length > 0
          ? `${reverseParticipants[reverseParticipants.length - 1][sort]}_${reverseParticipants[reverseParticipants.length - 1][secondarySort]}`
          : null
    }

    if (prevCursor === cursor) {
      prevCursor = null
    }
  }

  return reply.send({
    data: participants,
    limit: take,
    cursor,
    nextCursor,
    prevCursor
  })
}

export const getParticipant = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const participantRepo = AppDataSource.getRepository(Participant)
  const { pid, zid } = request.params as { pid: string; zid: string }

  const participant = await participantRepo.findOneBy({
    pid: parseInt(pid, 10),
    zid: parseInt(zid, 10)
  })

  if (participant) {
    return reply.send(participant)
  } else {
    return reply.status(404).send({ message: 'Participant not found' })
  }
}
