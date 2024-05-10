import { Entity, extractData } from './_shared'
import type { AppInfo, AppSetting } from './app.model'

class AppEntity extends Entity {
  constructor() {
    super()
  }

  async getAppInfo() {
    const data = await this.request.get<AppInfo>('/app/info').then(extractData)
    return data
  }

  async getAppSetting() {
    const data = await this.request.get<AppSetting>('/app/setting').then(extractData)
    return data
  }
}

export const appEntity = new AppEntity()
