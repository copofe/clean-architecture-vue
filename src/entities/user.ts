/*****************************************************************************/

import type { IStorage, IStore } from './app'

export interface IUser {
  id: number
  token: string
  username: string
}

/*****************************************************************************/
export async function getToken(storage: IStorage): Promise<string | null> {
  return storage.getItem('token')
}

export async function isLogged(storage: IStorage): Promise<boolean> {
  const token = await storage.getItem('token')
  return !!token
}

export class UserEntiry {
  constructor() {}

  login(user: IUser, storage: IStorage, store: IStore) {
    storage.setItem('token', user.token)
    store.setUser(user)
  }

  logout(storage: IStorage, store: IStore) {
    storage.removeItem('token')
    store.setUser()
  }
}
