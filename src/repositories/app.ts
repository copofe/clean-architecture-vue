import { Repository, extractData } from './_shared'
import type { AppInfo, AppSetting, RequestConfig } from '::/entities/app'

class AppRepo extends Repository {
  constructor() {
    super()
  }

  async getAppInfo(config?: RequestConfig) {
    return this.request.get<AppInfo>('', config).then(extractData)
  }

  async getAppSetting() {
    return this.request.get<AppSetting>('').then(extractData)
  }
}

export const appRepo = new AppRepo()
