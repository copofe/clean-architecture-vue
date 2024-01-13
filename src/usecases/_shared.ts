import mitt from 'mitt'
import type { Eventer } from '::/entities/app'

export const eventer: Eventer = mitt()
