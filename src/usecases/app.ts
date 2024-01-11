import { AppEntiry } from '::/entities/app'
import type { IStore, UseCase } from '::/entities/app'
import { AppRepo } from '::/repositories/app'

export class AppInitUsecase implements UseCase {
  private repo = new AppRepo()
  private entity = new AppEntiry()
  constructor(private store: IStore) {}

  async execute() {
    const [appSetting, appInfo] = await Promise.all([
      this.repo.getAppSetting().then(data => data.data),
      this.repo.getAppInfo().then(data => data.data),
    ])
    this.entity.setAppInfo(appInfo, this.store)
    this.entity.setAppSetting(appSetting, this.store)
  }
}
