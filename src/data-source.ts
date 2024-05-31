import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import env from './env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbDatabase,
  synchronize: env.dbSynchronize,
  logging: env.dbLogging,
  entities: [User],
  migrations: [],
  subscribers: []
})
