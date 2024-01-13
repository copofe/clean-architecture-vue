import { type Store, composeToken } from '::/entities/app'
import { AppRepo } from '::/repositories/app'
import { UserRepo } from '::/repositories/user'

export class AppUsecase {
  private repo: AppRepo
  constructor(private store: Store) {
    this.repo = new AppRepo(this.store)
  }

  async initialize() {
    const userRepo = new UserRepo(this.store)
    const token = await userRepo.getToken()
    if (token)
      this.repo.request.headers.Authorization = composeToken(token)

    const [appSetting, appInfo] = await Promise.all([
      this.repo.getAppSetting(),
      this.repo.getAppInfo(),
    ])
    this.repo.observeAppInfo(appInfo)
    this.repo.observeAppSetting(appSetting)
  }
}
