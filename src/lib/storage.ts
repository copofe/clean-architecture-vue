import { createStorage } from 'unstorage'
import localStorageDriver from 'unstorage/drivers/localstorage'
import type { Storage } from '::/entities/app'

const storage: Storage = createStorage({
  driver: localStorageDriver({}),
})

export default storage
