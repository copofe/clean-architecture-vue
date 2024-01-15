import { Usecase } from './_shared'
import type { Store } from '::/entities/app'
import { AppRepo } from '::/repositories/app'

export class AppUsecase extends Usecase {
  private repo: AppRepo
  constructor(private store: Store) {
    super()
    this.repo = new AppRepo(this.store)
  }

  async initialize() {
    const token = await this.repo.getToken()
    this.repo.updateAuthorization(token)

    const [appSetting, appInfo] = await Promise.all([
      this.repo.getAppSetting(),
      this.repo.getAppInfo(),
    ])
    this.repo.observeAppInfo(appInfo)
    this.repo.observeAppSetting(appSetting)
  }
}
