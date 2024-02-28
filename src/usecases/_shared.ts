import mitt from 'mitt'
import type { Eventer, ImplUsecase } from '::/entities/app.model'
import type { User } from '::/entities/user.model'

interface Events {
  // user
  'user.login': User
  'user.logout': void
}

const eventer: Eventer<Events> = mitt()

/******************************************************************************/

export class Usecase implements ImplUsecase {
  eventer = eventer
}
