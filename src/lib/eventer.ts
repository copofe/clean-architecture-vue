import mitt from 'mitt'
import type { Eventer } from '::/entities/app'

const eventer: Eventer = mitt()

export default eventer
