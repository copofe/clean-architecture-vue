import { z } from 'zod'
import { Repository, extractData } from './_shared'
import type { Token } from '::/entities/app.model'
import type { User } from '::/entities/user.model'

export const Schema = {
  username: z.string().min(2),
  password: z.string().min(6),
}

export const loginSchema = z.object({
  username: Schema.username,
  password: Schema.password,
})

type LoginParams = z.infer<typeof loginSchema>

class UserRepo extends Repository {
  constructor() {
    super()
  }

  async login(data: LoginParams) {
    const token = await this.request.post<Token>('/auth/login', data).then(extractData)
    await this.setToken(token)
    this.updateAuthorization(token)
    return token
  }

  async clearToken() {
    await this.setToken(null)
    this.updateAuthorization(null)
  }

  async logout() {
    await this.request.post('/auth/logout')
    this.clearToken()
  }

  async getCurrentUser() {
    return this.request.get<User>('/user/info').then(extractData)
  }
}

export const userRepo = new UserRepo()
