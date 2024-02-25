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
    const token = await this.request.post<Token>('/user/login', data).then(extractData)
    this.setToken(token)
    this.updateAuthorization(token)
    return token
  }

  async invalidateToken() {
    await this.request.post('/user/logout')
    this.setToken(null)
    this.updateAuthorization(null)
  }

  async getCurrentUser() {
    return this.request.get<User>('/user/info').then(extractData)
  }
}

export const userRepo = new UserRepo()
