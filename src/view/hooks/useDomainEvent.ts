import type { Events } from '::/entities/app'
import { eventer } from '::/lib'

export function useDomainEvent<K extends keyof Events>(event: K, callback: (data: Events[K]) => void) {
  onMounted(() => {
    eventer.on(event, (data) => {
      callback(data)
    })
  })

  onUnmounted(() => {
    eventer.off(event)
  })
}
