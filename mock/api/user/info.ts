import type { User } from '../../../src/entities/user.model'

export default defineEventHandler((): { data: User } => {
  return {
    data: { id: 1, username: 'admin', permission: [] },
  }
})
