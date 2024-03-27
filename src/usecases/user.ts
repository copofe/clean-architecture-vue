import { Usecase } from './_shared'
import { type LoginParams, loginSchema, userRepo } from '::/repositories/user'

class UserAuthUsecase extends Usecase {
  public readonly schema = loginSchema
  constructor() {
    super()
  }

  login = async (params: LoginParams) => {
    loginSchema.parse(params)

    const token = await userRepo.login(params)
    const user = await userRepo.getCurrentUser()

    return {
      token,
      user,
    }
  }

  logout = async () => {
    await userRepo.logout()
  }
}

export const userAuthUsecase = new UserAuthUsecase()
