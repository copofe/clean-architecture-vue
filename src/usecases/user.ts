import { z } from 'zod'
import { Usecase } from './_shared'
import { userRepo } from '::/repositories/user'

export const loginSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(6),
})

class UserAuthUsecase extends Usecase {
  constructor() {
    super()
  }

  login = async (...args: Parameters<typeof userRepo['generateToken']>) => {
    loginSchema.parse(...args)

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
