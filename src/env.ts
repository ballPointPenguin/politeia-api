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

function asBoolean(value: string | undefined): boolean {
  return value?.toLowerCase() === 'true'
}

function asInteger(value: string | undefined): number | undefined {
  if (typeof value === 'string') {
    return parseInt(value)
  }
}

// TODO - Allow for more nuanced appLogging and dbLogging configurations.

export default {
  appHost: process.env.APP_HOST,
  appLogging: asBoolean(process.env.APP_LOGGING),
  appPort: asInteger(process.env.APP_PORT),
  dbDatabase: process.env.DB_DATABASE,
  dbHost: process.env.DB_HOST,
  dbLogging: asBoolean(process.env.DB_LOGGING),
  dbPassword: process.env.DB_PASSWORD,
  dbPort: asInteger(process.env.DB_PORT),
  dbUsername: process.env.DB_USERNAME,
  googleClientId: process.env.GOOGLE_CLIENT_ID
} as AppEnv
