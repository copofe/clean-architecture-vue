import { createStorage } from 'unstorage'
import localStorageDriver from 'unstorage/drivers/localstorage'
import type { IStorage } from '::/entities/app'

const storage: IStorage = createStorage({
  driver: localStorageDriver({}),
})

export default storage
