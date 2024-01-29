import type { Permission } from './app.model'

export class UserEntity {
  static havePermission(permissions: Permission[], requiredPermission: Permission): boolean {
    return !!requiredPermission && permissions.includes(requiredPermission)
  }
}
