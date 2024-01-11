import type { IStorage, IStore, UseCase } from '::/entities/app'
import { UserEntiry } from '::/entities/user'
import { UserRepo } from '::/repositories/user'

class UserUsecase {
  repo = new UserRepo()
  entity = new UserEntiry()
  constructor() {}
}

export class UserLoginUsecase extends UserUsecase implements UseCase {
  constructor(private storage: IStorage, private store: IStore) {
    super()
  }

  async execute(...args: Parameters<UserRepo['login']>) {
    // TODO: 参数校验
    const res = await this.repo.login(...args)
    this.entity.login(res.data, this.storage, this.store)
  }
}

export class UserLogoutUsecase extends UserUsecase implements UseCase {
  constructor(private store: IStore, private storage: IStorage) {
    super()
  }

  async execute() {
    await this.repo.logout().catch(console.error)
    this.entity.logout(this.storage, this.store)
  }
}
