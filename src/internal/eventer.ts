import mitt from 'mitt'
import type { User } from '::/entities/user.model'
import type { AppInfo, AppSetting, Language } from '::/entities/app.model'
import type { Eventer } from '::/impl'

interface Events {
  'update.appInfo': AppInfo
  'update.setting': AppSetting
  'update.user': User
  'update.language': Language

  'user.login': User
  'user.logout': void

  'error.unauthorized': void
}

export const eventer: Eventer<Events> = mitt()
