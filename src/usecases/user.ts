import { Usecase } from './_shared'
import { loginSchema, userRepo } from '::/repositories/user'

class UserAuthUsecase extends Usecase {
  public readonly schema = loginSchema
  constructor() {
    super()
  }

  login = async (...args: Parameters<typeof userRepo['login']>) => {
    loginSchema.parse(args[0])

    const token = await userRepo.login(...args)
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
