import { createStorage } from 'unstorage'
import localStorageDriver from 'unstorage/drivers/localstorage'
import type { Token } from '::/entities/app.model'
import type { Storage } from '::/impl'

export interface StorageKeyValue {
  token: Token
}

export const storage: Storage<StorageKeyValue> = createStorage({
  driver: localStorageDriver({}),
})
