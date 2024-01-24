import type { Permission } from './app'

export type Token = string | null

export interface User {
  id: number
  username: string
  permission: Permission[]
}
