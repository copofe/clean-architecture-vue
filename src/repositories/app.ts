import { Repository, extractData } from './_shared'
import { eventer } from '::/internal/eventer'
import type { AppInfo, AppSetting, RequestConfig } from '::/entities/app.model'

class AppRepo extends Repository {
  constructor() {
    super()
  }

  async getAppInfo(config?: RequestConfig) {
    const data = await this.request.get<AppInfo>('/app/info', config).then(extractData)
    eventer.emit('update.appInfo', data)
    return data
  }

  async getAppSetting() {
    const data = await this.request.get<AppSetting>('/app/setting').then(extractData)
    eventer.emit('update.setting', data)
    return data
  }
}

export const appRepo = new AppRepo()
