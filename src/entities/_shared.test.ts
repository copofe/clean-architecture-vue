import { describe, expect, it } from 'vitest'
import { composeToken } from './_shared'

describe('composeToken', () => {
  it('should return empty string if token is not truthy', () => {
    const invalidToken = null
    expect(composeToken(invalidToken)).toBe('')
  })

  it('should throw if token is not a string or null', () => {
    const invalidToken = 123
    // @ts-expect-error invalid type
    expect(() => composeToken(invalidToken)).toThrowError()
  })

  it('should return empty string for empty string token', () => {
    const emptyToken = ' '
    expect(composeToken(emptyToken)).toBe('')
  })

  it('should trim whitespace from token', () => {
    const token = ' 123abc '
    expect(composeToken(token)).toBe('Bearer 123abc')
  })
})
