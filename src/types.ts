export type AppEnv = {
  appHost: string
  appLogging: boolean
  appPort: number
  clientOrigin: string
  dbDatabase: string
  dbHost: string
  dbLogging: boolean
  dbPassword: string
  dbPort: number
  dbSSL: boolean
  dbUsername: string
  googleClientId: string
  sessionSecret: string
}

export type SessionUser = {
  email?: string
  name?: string
  sub?: string
}

export type RequestQuery = {
  page?: number
  limit?: number
  sort?: string
  order?: 'ASC' | 'DESC'
  [key: string]: string | number | undefined // filters
}
