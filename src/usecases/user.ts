import type { ImplUsecase } from './_shared'
import type { Store } from '::/entities/app'
import { AppRepo } from '::/repositories/app'
import { UserRepo } from '::/repositories/user'

class UserUsecase {
  repo: UserRepo
  appRepo: AppRepo
  constructor(store: Store) {
    this.repo = new UserRepo(store)
    this.appRepo = new AppRepo(store)
  }
}

export class UserLoginUsecase extends UserUsecase implements ImplUsecase {
  constructor(store: Store) {
    super(store)
  }

  async execute(...args: Parameters<UserRepo['login']>) {
    // TODO: validate params
    const res = await this.repo.login(...args)
    this.repo.setUser(res.data.data)
    this.appRepo.setToken(res.data.data.token)
  }
}

export class UserLogoutUsecase extends UserUsecase implements ImplUsecase {
  constructor(store: Store) {
    super(store)
  }

  async execute() {
    await this.repo.logout()
    this.repo.setUser()
    this.appRepo.setToken(null)
  }
}
