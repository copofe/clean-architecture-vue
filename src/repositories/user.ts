import { Repository, extractData } from './_base'
import type { IRequestConfig } from '::/entities/app'
import type { IUser } from '::/entities/user'

export class UserRepo extends Repository {
  constructor() {
    super()
  }

  async login(data: {
    username: string
    password: string
  }, config?: IRequestConfig) {
    return this.request.post<IUser>('/api/user/login', data, config).then(extractData)
  }

  async logout() {
    return this.request.get('/api/user/logout').then(extractData)
  }
}
