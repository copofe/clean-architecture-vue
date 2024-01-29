import type { Permission } from './app.model'

export interface User {
  id: number
  username: string
  permission: Permission[]
}
