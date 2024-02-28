import { Usecase } from './_shared'
import { userRepo } from '::/repositories/user'

class UserAuthUsecase extends Usecase {
  constructor() {
    super()
  }

  login = async (...args: Parameters<typeof userRepo['generateToken']>) => {
    // TODO: validate params

    const token = await userRepo.generateToken(...args)
    const user = await userRepo.getCurrentUser()

    return {
      token,
      user,
    }
  }

  logout = async () => {
    await userRepo.invalidateToken()
  }
}

export const userAuthUsecase = new UserAuthUsecase()
