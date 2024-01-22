import { Usecase } from './_shared'
import { userRepo } from '::/repositories/user'

class UserAuthUsecase extends Usecase {
  constructor() {
    super()
  }

  async login(..._args: Parameters<typeof userRepo['generateToken']>) {
    // TODO: validate params

    // TODO: your own logic
    const token = '123abc'
    // const token = await userRepo.generateToken(...args)
    userRepo.setToken(token)
    userRepo.updateAuthorization(token)
    const user = { token, id: 1, username: 'admin', permission: [] }
    // const user = await userRepo.getCurrentUser()

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
