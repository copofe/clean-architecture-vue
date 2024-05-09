import { Entity, extractData } from './_shared'
import type { AppInfo, AppSetting } from './app.model'
import type { RequestConfig } from '::/implement'
import { eventer } from '::/internal/eventer'

class AppEntity extends Entity {
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

export const appEntity = new AppEntity()
