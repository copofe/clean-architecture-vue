import { Repository, extractData } from './_shared'
import type { Store, Token } from '::/entities/app'
import type { User } from '::/entities/user'

export class UserRepo extends Repository {
  constructor(private store: Store) {
    super()
  }

  async generateToken(data: {
    username: string
    password: string
  }) {
    return this.request.post<Token>('/api/user/login', data).then(extractData)
  }

  invalidateToken() {
    return this.request.get<void>('/api/user/logout')
  }

  setToken(token: Token) {
    return this.storage.setItem('token', token)
  }

  getToken() {
    return this.storage.getItem('token')
  }

  async getCurrentUser() {
    return this.request.get<User>('/api/user').then(extractData)
  }

  observeUser(user?: User) {
    this.store.setUser(user)
  }
}
