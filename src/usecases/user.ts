import { eventer } from './_shared'
import type { Store } from '::/entities/app'
import { UserRepo } from '::/repositories/user'

class UserUsecase {
  protected repo: UserRepo
  constructor(store: Store) {
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
    const user = await this.repo.getCurrentUser()
    eventer.emit('user.logged', user)
    this.repo.observeUser(user)
  }

  async logout() {
    await this.repo.invalidateToken()
    eventer.emit('user.logOut')
    this.repo.observeUser()
    this.repo.setToken(null)
  }
}
