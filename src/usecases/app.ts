import { Usecase } from './_shared'
import { appRepo } from '::/repositories/app'

class AppUsecase extends Usecase {
  constructor() {
    super()
  }

  async initialize() {
    const token = await appRepo.getToken()
    appRepo.updateAuthorization(token)

    const [appSetting, appInfo] = await Promise.all([
      appRepo.getAppSetting(),
      appRepo.getAppInfo(),
    ])

    return {
      token,
      appInfo,
      appSetting,
    }
  }
}

export const appUsecase = new AppUsecase()
