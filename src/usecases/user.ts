import { Usecase } from './_shared'
import type { Store } from '::/entities/app'
import { UserRepo } from '::/repositories/user'

class UserUsecase extends Usecase {
  protected repo: UserRepo
  constructor(store: Store) {
    super()
    this.repo = new UserRepo(store)
  }
}

export class UserAuthUsecase extends UserUsecase {
  constructor(store: Store) {
    super(store)
  }

  async login(...args: Parameters<UserRepo['generateToken']>) {
    // TODO: validate params
    const token = await this.repo.generateToken(...args)
    this.repo.setToken(token)
    this.repo.updateAuthorization(token)
    const user = await this.repo.getCurrentUser()
    this.repo.observeUser(user)

    this.eventer.emit('user.login', user)
  }

  async logout() {
    await this.repo.invalidateToken()
    this.repo.observeUser()
    this.repo.setToken(null)
    this.repo.updateAuthorization(null)

    this.eventer.emit('user.logout')
  }
}
