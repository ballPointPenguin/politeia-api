// Run with:
// npx env-cmd -f .env node dbtest.js, or
// npx env-cmd -f preprod.env node dbtest.js, or whatever.env

const { Client } = require('pg')

// log process.env where keyname contains 'DB'
console.log(
  Object.keys(process.env).reduce((acc, key) => {
    if (key.includes('DB')) {
      acc[key] = process.env[key]
    }
    return acc
  }, {})
)

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: { rejectUnauthorized: false }
})

client
  .connect()
  .then(() => {
    console.log('Connected successfully')
    return client.end()
  })
  .catch((err) => console.error('Connection error', err.stack))
