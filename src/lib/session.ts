import { createStorage } from 'unstorage'
import sessionStorageDriver from 'unstorage/drivers/session-storage'
import type { ISession } from '::/entities/app'

const session: ISession = createStorage({
  driver: sessionStorageDriver({}),
})

export default session
