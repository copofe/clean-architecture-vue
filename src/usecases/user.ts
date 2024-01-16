import { Usecase } from './_shared'
import { UserRepo } from '::/repositories/user'

class UserUsecase extends Usecase {
  protected repo = new UserRepo()
  constructor() {
    super()
  }
}

export class UserAuthUsecase extends UserUsecase {
  constructor() {
    super()
  }

  async login(...args: Parameters<UserRepo['generateToken']>) {
    // TODO: validate params
    const token = await this.repo.generateToken(...args)
    this.repo.setToken(token)
    this.repo.updateAuthorization(token)
    const user = await this.repo.getCurrentUser()

    this.eventer.emit('user.login', user)

    return {
      token,
      user,
    }
  }

  async logout() {
    await this.repo.invalidateToken()
    this.repo.setToken(null)
    this.repo.updateAuthorization(null)

    this.eventer.emit('user.logout')
  }
}
