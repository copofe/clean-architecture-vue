import { describe, expect, it } from 'vitest'
import type { Permission } from './app.model'
import { havePermission } from './user.model'

describe('havePermission', () => {
  it('should return true if required permission is in permissions list', () => {
    const permissions: Permission[] = ['read', 'write']
    const requiredPermission = 'read'
    expect(havePermission(permissions, requiredPermission)).toBe(true)
  })

  it('should return false if required permission is not in permissions list', () => {
    const permissions: Permission[] = ['read']
    const requiredPermission = 'delete'
    expect(havePermission(permissions, requiredPermission)).toBe(false)
  })

  it('should handle empty permissions list', () => {
    const permissions: Permission[] = []
    const requiredPermission = 'read'
    expect(havePermission(permissions, requiredPermission)).toBe(false)
  })
})
