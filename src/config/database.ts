// Required for TypeScript to work effectively with class decorators:
import 'reflect-metadata'

import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { DataSource } from 'typeorm'
import { User } from '../entities/User'
import env from '../env'

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbDatabase,
  synchronize: false,
  logging: env.dbLogging,
  logNotifications: env.dbLogging,
  ssl: env.dbSSL ? { rejectUnauthorized: false } : false,
  entities: [User]
}

export const AppDataSource = new DataSource(options)
