import { ImplRepository } from '::/entities/app.model'
import type { ApiResponse, Token } from '::/entities/app.model'
import { AppEntity } from '::/entities/app.entity'
import { request } from '::/adapter/request'
import { storage } from '::/adapter/storage'
import { session } from '::/adapter/session'
import { eventer } from '::/internal/eventer'

export class Repository extends ImplRepository {
  protected request = request
  protected storage = storage
  protected session = session
  constructor() {
    super()
  }

  async setToken(token: Token) {
    this.updateAuthorization(token)
    await this.storage.setItem('token', token)
  }

  getToken() {
    return this.storage.getItem('token')
  }

  async clearToken() {
    await this.setToken(null)
    this.updateAuthorization(null)
  }

  protected updateAuthorization(token: Token) {
    this.request.headers.Authorization = AppEntity.composeToken(token)
  }

  updateAcceptLanguage(lang: string) {
    this.request.headers['Accept-Language'] = lang
    eventer.emit('update.language', lang)
  }
}

/******************************************************************************/

export function extractData<T>(res: ApiResponse<T>): ApiResponse<T>['data']['data'] {
  return res.data.data
}
