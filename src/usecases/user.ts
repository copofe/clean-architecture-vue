import { Usecase } from './_shared'
import { eventer } from '::/internal/eventer'
import { type LoginParams, loginSchema, userEntity } from '::/entities/user.entity'

export class UserAuthUsecase extends Usecase {
  public readonly schema = loginSchema
  constructor() {
    super()
  }

  login = async (params: LoginParams) => {
    const token = await userEntity.login(params)
    const user = await userEntity.getCurrentUser()
    eventer.emit('user.login', user)

    return {
      token,
      user,
    }
  }

  logout = async () => {
    await userEntity.logout()
    eventer.emit('user.logout')
  }
}
