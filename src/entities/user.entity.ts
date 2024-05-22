import { z } from 'zod'
import { Entity, extractData } from './_shared'
import type { Token } from './app.model'
import type { User } from './user.model'

const username = z.string().min(2)
const password = z.string().min(6)

export const loginSchema = z.object({
  username,
  password,
})

export type LoginParams = z.infer<typeof loginSchema>

class UserEntity extends Entity {
  constructor() {
    super()
  }

  async login(data: LoginParams): Promise<string> {
    loginSchema.parse(data)

    const token = await this.request.post<string>('/auth/login', data).then(extractData)
    await this.setToken(token)
    return token
  }

  async logout() {
    await this.request.post('/auth/logout')
    this.clearToken()
  }

  async getCurrentUser(): Promise<User> {
    const user = await this.request.get<User>('/user/info').then(extractData)
    return user
  }
}

export const userEntity = new UserEntity()
