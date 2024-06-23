import type { SessionUser } from '../types'

// Extend fastify.session with your custom type.
declare module 'fastify' {
  interface Session {
    user: SessionUser
  }
}
