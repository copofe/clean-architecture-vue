import { Repository, extractData } from './_shared'
import type { AppInfo, AppSetting, RequestConfig } from '::/entities/app.model'

class AppRepo extends Repository {
  constructor() {
    super()
  }

  async getAppInfo(config?: RequestConfig) {
    return this.request.get<AppInfo>('/api/app', config).then(extractData)
  }

  async getAppSetting() {
    return this.request.get<AppSetting>('/api/app/setting').then(extractData)
  }
}

export const appRepo = new AppRepo()
