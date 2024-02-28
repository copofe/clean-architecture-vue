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
    await this.setToken(token)
    this.updateAuthorization(token)
    return token
  }

  async clearToken() {
    await this.setToken(null)
    this.updateAuthorization(null)
  }

  async invalidateToken() {
    await this.request.post('/user/logout')
    this.clearToken()
  }

  async getCurrentUser() {
    return this.request.get<User>('/user/info').then(extractData)
  }
}

export const userRepo = new UserRepo()
