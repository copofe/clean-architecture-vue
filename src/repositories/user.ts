import { Repository } from './_shared'
import type { Store } from '::/entities/app'
import type { User } from '::/entities/user'

export class UserRepo extends Repository {
  constructor(private store: Store) {
    super()
  }

  async login(data: {
    username: string
    password: string
  }) {
    return this.request.post<User>('/api/user/login', data)
  }

  async logout() {
    return this.request.get('/api/user/logout')
  }

  async getUser() {
    return this.request.get<User>('/api/user')
  }

  setUser(user?: User) {
    this.store.setUser(user)
  }
}
