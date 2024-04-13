import { Usecase } from './_shared'
import { appRepo } from '::/repositories/app'
// import { userRepo } from '::/repositories/user'

class AppUsecase extends Usecase {
  constructor() {
    super()
  }

  async initialize() {
    const token = await appRepo.getToken()
    if (token)
      appRepo.setToken(token)

    // const initialTasks: Promise<any>[] = [
    //   appRepo.getAppSetting(),
    //   appRepo.getAppInfo(),
    // ]

    // if (token)
    //   initialTasks.push(userRepo.getCurrentUser())

    // await Promise.all(initialTasks)
  }
}

export const appUsecase = new AppUsecase()
