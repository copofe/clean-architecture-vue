import { describe, expect, it } from 'vitest'
import { AppEntity } from './app.entity'

describe('composeToken', () => {
  it('should return empty string if token is not truthy', () => {
    const invalidToken = null
    expect(AppEntity.composeToken(invalidToken)).toBe('')
  })

  it('should throw if token is not a string or null', () => {
    const invalidToken = 123
    // @ts-expect-error invalid type
    expect(() => AppEntity.composeToken(invalidToken)).toThrowError()
  })

  it('should return empty string for empty string token', () => {
    const emptyToken = ' '
    expect(AppEntity.composeToken(emptyToken)).toBe('')
  })

  it('should trim whitespace from token', () => {
    const token = ' 123abc '
    expect(AppEntity.composeToken(token)).toBe('Bearer 123abc')
  })
})
