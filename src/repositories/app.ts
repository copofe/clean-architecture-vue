import { Repository, extractData } from './_base'
import type { IAppInfo, IAppSetting } from '::/entities/app'

export class AppRepo extends Repository {
  constructor() {
    super()
  }

  async getAppInfo() {
    return this.request.get<IAppInfo>('').then(extractData)
  }

  async getAppSetting() {
    return this.request.get<IAppSetting>('').then(extractData)
  };
}
