import mitt from 'mitt'
import type { User } from '::/entities/user.model'
import type { Eventer } from '::/implement'

interface Events {
  'user.login': User
  'user.logout': void
}

export const eventer: Eventer<Events> = mitt()
