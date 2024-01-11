import mitt from 'mitt'
import type { IEventer } from '::/entities/app'

const eventer: IEventer = mitt()

export default eventer
