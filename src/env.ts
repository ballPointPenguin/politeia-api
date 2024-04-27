import dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.POLIS_ENV === 'prod'
      ? 'prod.env'
      : process.env.POLIS_ENV === 'preprod'
        ? 'preprod.env'
        : '.env'
});

export default {
  dbDatabase: process.env.DB_DATABASE || 'politeia-dev',
  dbHost: process.env.DB_HOST || 'localhost',
  dbLogging: process.env.DB_LOGGING === 'true',
  dbPassword: process.env.DB_PASSWORD || 'postgres',
  dbPort: parseInt(process.env.DB_PORT || '5432', 10),
  dbSynchronize: process.env.NODE_ENV !== 'production',
  dbUsername: process.env.DB_USERNAME || 'postgres'
};
