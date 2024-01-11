import type { IEvents } from '::/entities/app'
import { eventer } from '::/lib'

export function useDomainEvent<K extends keyof IEvents>(event: K, callback: (data: IEvents[K]) => void) {
  onMounted(() => {
    eventer.on(event, (data) => {
      callback(data)
    })
  })

  onUnmounted(() => {
    eventer.off(event)
  })
}
