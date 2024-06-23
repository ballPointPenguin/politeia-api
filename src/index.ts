import type { FastifyListenOptions } from 'fastify'
import { AppDataSource } from './config/database'
import cors from '@fastify/cors'
import env from './env'
import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import routes from './routes'

export const startServer = async () => {
  const app = fastify({ logger: env.appLogging })

  // Register CORS
  await app.register(cors, {
    origin: env.clientOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })

  // Register cookie
  await app.register(fastifyCookie)

  // Register session
  await app.register(fastifySession, {
    secret: env.sessionSecret,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      secure: 'auto' // true for HTTPS, false for HTTP
    }
  })

  // Register routes
  await app.register(routes, { prefix: '/api' })

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
