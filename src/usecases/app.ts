import type { ImplUseCase } from './_shared'
import type { Store } from '::/entities/app'
import { AppRepo } from '::/repositories/app'

export class AppInitUsecase implements ImplUseCase {
  private repo: AppRepo
  constructor(private store: Store) {
    this.repo = new AppRepo(this.store)
  }

  async execute() {
    const token = await this.repo.getToken()
    this.repo.setToken(token)

    const [appSetting, appInfo] = await Promise.all([
      this.repo.getAppSetting(),
      this.repo.getAppInfo(),
    ])
    this.repo.setAppInfo(appInfo)
    this.repo.setAppSetting(appSetting)
  }
}
