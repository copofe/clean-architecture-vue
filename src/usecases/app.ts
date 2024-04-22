import { Usecase } from './_shared'
import { appEntity } from '::/entities/app.entity'
// import { userEntity } from '::/entities/user.entity'

class AppUsecase extends Usecase {
  constructor() {
    super()
  }

  async initialize() {
    const token = await appEntity.getToken()
    if (token)
      appEntity.setToken(token)

    // const initialTasks: Promise<any>[] = [
    //   appEntity.getAppSetting(),
    //   appEntity.getAppInfo(),
    // ]

    // if (token)
    //   initialTasks.push(userEntity.getCurrentUser())

    // await Promise.all(initialTasks)
  }
}

export const appUsecase = new AppUsecase()
