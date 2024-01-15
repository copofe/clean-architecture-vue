import { Repository, extractData } from './_shared'
import type { Store } from '::/entities/app'
import type { Token, User } from '::/entities/user'

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

  async getCurrentUser() {
    return this.request.get<User>('/api/user').then(extractData)
  }

  observeUser(user?: User) {
    this.store.setUser(user)
  }
}
