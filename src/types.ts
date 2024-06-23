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
  dbUsername: string
  googleClientId: string
  sessionSecret: string
}

export type SessionUser = {
  email?: string
  name?: string
  sub?: string
}
