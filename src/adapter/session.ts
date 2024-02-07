import { createStorage } from 'unstorage'
import sessionStorageDriver from 'unstorage/drivers/session-storage'
import type { Session } from '::/entities/app.model'

export interface SessionKeyValue {}

export const session: Session<SessionKeyValue> = createStorage({
  driver: sessionStorageDriver({}),
})
