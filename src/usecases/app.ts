/* eslint-disable unused-imports/no-unused-vars */
import { Usecase } from './_shared'
import { appEntity } from '::/entities/app.entity'
import type { AppInfo, AppSetting } from '::/entities/app.model'
import { userEntity } from '::/entities/user.entity'
import type { User } from '::/entities/user.model'

class AppUsecase extends Usecase {
  constructor() {
    super()
  }

  async initialize({
    setAppInfo,
    setAppSetting,
    setUser,
  }: {
    setAppInfo: (data: AppInfo) => void
    setAppSetting: (data: AppSetting) => void
    setUser: (data: User) => void
  }) {
    const token = await appEntity.getToken()
    if (token)
      appEntity.setToken(token)

    // const initialTasks: Promise<any>[] = [
    //   appEntity.getAppSetting().then(setAppSetting),
    //   appEntity.getAppInfo().then(setAppInfo),
    // ]

    // if (token)
    //   initialTasks.push(userEntity.getCurrentUser().then(setUser))

    // await Promise.all(initialTasks)
  }
}

export const appUsecase = new AppUsecase()
