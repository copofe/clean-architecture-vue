import { Repository, extractData } from './_shared'
import type { Token } from '::/entities/app.model'
import type { User } from '::/entities/user.model'

class UserRepo extends Repository {
  constructor() {
    super()
  }

  async generateToken(data: {
    username: string
    password: string
  }) {
    return this.request.post<Token>('/user/login', data).then(extractData)
  }

  invalidateToken() {
    return this.request.get<void>('/user/logout')
  }

  async getCurrentUser() {
    return this.request.get<User>('/user').then(extractData)
  }
}

export const userRepo = new UserRepo()
