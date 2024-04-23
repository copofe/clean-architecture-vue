import { z } from 'zod'
import { Entity, extractData, validate } from './_shared'
import type { Token } from './app.model'
import type { User } from './user.model'
import { eventer } from '::/internal/eventer'

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

  @validate(loginSchema)
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

export const userEntity = new UserEntity()
