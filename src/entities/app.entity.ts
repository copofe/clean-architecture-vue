import type { Token } from './app.model'

export class AppEntity {
  static composeToken(token: Token): string {
    if (typeof token !== 'string' && token !== null)
      throw new TypeError('Token must be a string or null')

    if (token === null || token.trim().length === 0)
      return ''

    return `Bearer ${token.trim()}`
  }
}
