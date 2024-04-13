import { z } from 'zod'
import { Repository, extractData } from './_shared'
import type { Token } from '::/entities/app.model'
import type { User } from '::/entities/user.model'
import { eventer } from '::/internal/eventer'

const schemaUsername = z.string().min(2)
const schemaPassword = z.string().min(6)

export const loginSchema = z.object({
  username: schemaUsername,
  password: schemaPassword,
})

export type LoginParams = z.infer<typeof loginSchema>

class UserRepo extends Repository {
  constructor() {
    super()
  }

  async login(data: LoginParams) {
    const token = await this.request.post<Exclude<Token, null>>('/auth/login', data).then(extractData)
    await this.setToken(token)
    return token
  }

  async logout() {
    await this.request.post('/auth/logout')
    this.clearToken()
  }

  async getCurrentUser() {
    const user = await this.request.get<User>('/user/info').then(extractData)
    eventer.emit('update.user', user)
    return user
  }
}

export const userRepo = new UserRepo()
