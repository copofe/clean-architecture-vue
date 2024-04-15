import { Usecase } from './_shared'
import { eventer } from '::/internal/eventer'
import { type LoginParams, loginSchema, userRepo } from '::/repositories/user'

class UserAuthUsecase extends Usecase {
  public readonly schema = loginSchema
  constructor() {
    super()
  }

  login = async (params: LoginParams) => {
    const token = await userRepo.login(params)
    const user = await userRepo.getCurrentUser()

    eventer.emit('user.login', user)

    return {
      token,
      user,
    }
  }

  logout = async () => {
    await userRepo.logout()
    eventer.emit('user.logout')
  }
}

export const userAuthUsecase = new UserAuthUsecase()
