import type { Permission } from './app.model'

export interface User {
  id: number
  username: string
  permission: Permission[]
}

export function havePermission(permissions: Permission[], requiredPermission: Permission): boolean {
  return !!requiredPermission && permissions.includes(requiredPermission)
}
