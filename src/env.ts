// https://github.com/keithmorris/node-dotenv-extended
import type { AppEnv } from './types'
import dotenvExtended from 'dotenv-extended'

// Determine the environment (e.g. dev, preprod, prod)
const envName = process.env.POLIS_ENV || 'dev'
// Use .env file for dev, otherwise use `${envName}.env`
const envPath = envName === 'dev' ? '.env' : `${envName}.env`

// Load the base .env file and overlay the environment-specific file, if it exists
dotenvExtended.load({
  path: envPath,
  defaults: '.env.defaults',
  schema: '.env.schema',
  errorOnMissing: true,
  errorOnExtra: true,
  errorOnRegex: true
})

const env: AppEnv = {
  appHost: asString(process.env.APP_HOST),
  appLogging: asBoolean(process.env.APP_LOGGING),
  appPort: asInteger(process.env.APP_PORT),
  clientOrigin: asString(process.env.CLIENT_ORIGIN),
  dbDatabase: asString(process.env.DB_DATABASE),
  dbHost: asString(process.env.DB_HOST),
  dbLogging: asBoolean(process.env.DB_LOGGING),
  dbPassword: asString(process.env.DB_PASSWORD),
  dbPort: asInteger(process.env.DB_PORT),
  dbUsername: asString(process.env.DB_USERNAME),
  googleClientId: asString(process.env.GOOGLE_CLIENT_ID),
  sessionSecret: asString(process.env.SESSION_SECRET)
}

// TODO - Allow for more nuanced appLogging and dbLogging configurations.
function asBoolean(value: string | undefined): boolean {
  return value?.toLowerCase() === 'true'
}

function asInteger(value: string | undefined): number {
  if (typeof value === 'string') {
    return parseInt(value)
  } else {
    return Number(value)
  }
}

function asString(value: string | undefined): string {
  return String(value)
}

export default env
