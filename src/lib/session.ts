import { createStorage } from 'unstorage'
import sessionStorageDriver from 'unstorage/drivers/session-storage'
import type { Session } from '::/entities/app'

const session: Session = createStorage({
  driver: sessionStorageDriver({}),
})

export default session
