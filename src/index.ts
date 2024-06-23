import type { FastifyListenOptions } from 'fastify'
import { AppDataSource } from './config/database'
import fastify from 'fastify'
import env from './env'
import userRoutes from './routes/userRoutes'

export const startServer = async () => {
  const app = fastify({ logger: env.appLogging })

  await app.register(userRoutes, { prefix: '/users' })

  const listenOptions: FastifyListenOptions = {
    host: env.appHost,
    port: env.appPort
  }

  try {
    await AppDataSource.initialize()
    console.log('Data Source has been initialized')
    await app.listen(listenOptions)
    console.log(`Server listening at ${env.appHost} on port ${env.appPort}`)
  } catch (err) {
    console.error('Error initializing data source: ', err)
    app.log.error(err)
    process.exit(1)
  }
}

void startServer()
