import { Usecase } from './_shared'
import { userRepo } from '::/repositories/user'

class UserAuthUsecase extends Usecase {
  constructor() {
    super()
  }

  login = async (...args: Parameters<typeof userRepo['generateToken']>) => {
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

  logout = async () => {
    await userRepo.invalidateToken()
    userRepo.setToken(null)
    userRepo.updateAuthorization(null)

    this.eventer.emit('user.logout')
  }
}

export const userAuthUsecase = new UserAuthUsecase()
