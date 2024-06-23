import type { FastifyRequest, FastifyReply } from 'fastify'
import { AppDataSource } from '../config/database'
import { User } from '../entities/User'

export const listUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (!request.session.user) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  const userRepo = AppDataSource.getRepository(User)
  const users = await userRepo.find()

  return reply.send(users)
}

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.session.user) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

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
