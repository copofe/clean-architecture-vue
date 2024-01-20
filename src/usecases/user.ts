import { Usecase } from './_shared'
import { userRepo } from '::/repositories/user'

class UserUsecase extends Usecase {
  constructor() {
    super()
  }
}

class UserAuthUsecase extends UserUsecase {
  constructor() {
    super()
  }

  async login(...args: Parameters<typeof userRepo['generateToken']>) {
    // TODO: validate params
    const token = await userRepo.generateToken(...args)
    userRepo.setToken(token)
    userRepo.updateAuthorization(token)
    const user = await userRepo.getCurrentUser()

    this.eventer.emit('user.login', user)

    return {
      token,
      user,
    }
  }

  async logout() {
    await userRepo.invalidateToken()
    userRepo.setToken(null)
    userRepo.updateAuthorization(null)

    this.eventer.emit('user.logout')
  }
}

export const userAuthUsecase = new UserAuthUsecase()
