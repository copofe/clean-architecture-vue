import { Usecase } from './_shared'
import { AppRepo } from '::/repositories/app'

export class AppUsecase extends Usecase {
  private repo = new AppRepo()
  constructor() {
    super()
  }

  async initialize() {
    const token = await this.repo.getToken()
    this.repo.updateAuthorization(token)

    const [appSetting, appInfo, language] = await Promise.all([
      this.repo.getAppSetting(),
      this.repo.getAppInfo(),
      this.getLanguage(),
    ])

    return {
      token,
      appInfo,
      appSetting,
      language,
    }
  }

  setLanguage(language: string) {
    return this.repo.setLanguage(language)
  }

  getLanguage() {
    return this.repo.getLanguage()
  }
}
