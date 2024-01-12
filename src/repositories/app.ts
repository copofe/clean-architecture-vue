import { Repository, extractData } from './_shared'
import { composeToken } from '::/entities/app'
import type { AppInfo, AppSetting, RequestConfig, Store, Token } from '::/entities/app'

export class AppRepo extends Repository {
  constructor(private store: Store) {
    super()
  }

  setToken(token: Token) {
    this.storage.setItem('token', token)
    this.request.Authorization = composeToken(token)
  }

  getToken(): Promise<Token> {
    return this.storage.getItem('token')
  }

  setAppInfo(data: AppInfo) {
    this.store.setAppInfo(data)
  }

  async getAppInfo(config?: RequestConfig) {
    return this.request.get<AppInfo>('/init', config).then(extractData)
  }

  setAppSetting(data: AppSetting) {
    this.store.setSetting(data)
  }

  async getAppSetting() {
    return this.request.get<AppSetting>('/init').then(extractData)
  };
}
