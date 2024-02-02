import type { User } from '../../../src/entities/user.model'

export default defineEventHandler((): User => {
  return { id: 1, username: 'admin', permission: [] }
})
