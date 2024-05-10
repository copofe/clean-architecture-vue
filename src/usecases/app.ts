import { Usecase } from './_shared'
import { appEntity } from '::/entities/app.entity'
import { userEntity } from '::/entities/user.entity'

class AppUsecase extends Usecase {
  constructor() {
    super()
  }

  async initialize() {
    const token = await appEntity.getToken()
    if (token)
      appEntity.setToken(token)

    const { setAppInfo, setAppSetting, setUser } = useStore()

    const initialTasks: Promise<any>[] = [
      appEntity.getAppSetting().then(setAppSetting),
      appEntity.getAppInfo().then(setAppInfo),
    ]

    if (token)
      initialTasks.push(userEntity.getCurrentUser().then(setUser))

    await Promise.all(initialTasks)
  }
}

export const appUsecase = new AppUsecase()
