import { useStore } from './store'
import { appUsecase } from '::/usecases/app'

export function registerEventHub() {
  const { eventer } = appUsecase
  const store = useStore()

  eventer.on('user.login', (user) => {
    store.user = user
  })

  eventer.on('user.logout', () => {
    store.user = undefined
  })
}
