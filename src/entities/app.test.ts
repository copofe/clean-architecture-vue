import { describe, expect, it } from 'vitest'
import { RequestError, StandardError, composeToken } from './app'

describe('composeToken', () => {
  it('should throw if token is not a string', () => {
    const invalidToken = 123
    // @ts-expect-error invalid type
    expect(() => composeToken(invalidToken)).toThrowError()
  })

  it('should return empty string for empty string token', () => {
    const emptyToken = ''
    expect(composeToken(emptyToken)).toBe('')
  })

  it('should trim whitespace from token', () => {
    const token = ' 123abc '
    expect(composeToken(token)).toBe('Bearer 123abc')
  })
})

describe('standardError', () => {
  it('should initialize with name and message', () => {
    const name = 'ValidationError'
    const message = 'Field is required'
    const error = new StandardError(name, message)

    expect(error.name).toBe(name)
    expect(error.message).toBe(message)
  })

  it('should extend Error class', () => {
    const error = new StandardError('Name', 'Message')

    expect(error).toBeInstanceOf(Error)
    expect(error.stack).toBeDefined()
  })

  it('should set message as parameter to super constructor', () => {
    const message = 'Error message'
    const error = new StandardError('Name', message)

    expect((error as any).message).toBe(message)
  })
})

describe('requestError', () => {
  it('should initialize with message', () => {
    const message = 'Request failed'
    const error = new RequestError(message)

    expect(error.name).toBe('RequestError')
    expect(error.message).toBe(message)
  })

  it('should initialize with optional code', () => {
    const code = 1
    const error = new RequestError('err code', code)

    expect(error.code).toBe(code)
  })

  it('should pass message to StandardError', () => {
    const message = 'Error message'
    const error = new RequestError(message)

    expect((error as any).message).toBe(message)
  })

  it('should extend Error', () => {
    const error = new RequestError('Message')

    expect(error).toBeInstanceOf(Error)
  })
})
