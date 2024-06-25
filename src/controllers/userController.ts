import type { FastifyRequest, FastifyReply } from 'fastify'
import { AppDataSource } from '../config/database'
import { User } from '../entities/User'

type RequestQuery = {
  page?: number
  limit?: number
  sort?: string
  order?: 'ASC' | 'DESC'
  [key: string]: string | number | undefined // filters
}

export const listUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    page = 1,
    limit = 50,
    sort = 'uid',
    order = 'ASC'
    // ...filters
  } = request.query as RequestQuery

  const userRepo = AppDataSource.getRepository(User)
  const alias = userRepo.metadata.targetName
  const skip = (page - 1) * limit
  const queryBuilder = userRepo.createQueryBuilder(alias)

  // Apply filters (TODO)

  // Apply sorting
  queryBuilder.orderBy(`${alias}.${sort}`, order)

  // Apply pagination
  queryBuilder.skip(skip).take(limit)

  const [users, total] = await queryBuilder.getManyAndCount()

  return reply.send({
    data: users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  })
}

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const userRepo = AppDataSource.getRepository(User)
  const { uid } = request.params as { uid: string }

  const user = await userRepo.findOneBy({
    uid: parseInt(uid, 10)
  })

  if (user) {
    return reply.send(user)
  } else {
    return reply.status(404).send({ message: 'User not found' })
  }
}
