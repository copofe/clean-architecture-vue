import type { Token } from './app.model'

export class AppEntity {
  constructor() {}

  static composeToken(token: Token): string {
    if (!token)
      return ''

    if (typeof token !== 'string')
      throw new TypeError('Token must be a string')

    if (token.trim().length === 0)
      return ''

    return `Bearer ${token.trim()}`
  }
}
