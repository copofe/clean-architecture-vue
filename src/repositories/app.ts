import { Repository, extractData } from './_shared'
import type { AppInfo, AppSetting, RequestConfig, Store } from '::/entities/app'

export class AppRepo extends Repository {
  constructor(private store: Store) {
    super()
  }

  observeAppInfo(data: AppInfo) {
    this.store.setAppInfo(data)
  }

  async getAppInfo(config?: RequestConfig) {
    return this.request.get<AppInfo>('', config).then(extractData)
  }

  observeAppSetting(data: AppSetting) {
    this.store.setSetting(data)
  }

  async getAppSetting() {
    return this.request.get<AppSetting>('').then(extractData)
  };
}
