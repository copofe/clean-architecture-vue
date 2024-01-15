import type { AxiosError } from 'axios'
import axios from 'axios'
import { createStorage } from 'unstorage'
import sessionStorageDriver from 'unstorage/drivers/session-storage'
import localStorageDriver from 'unstorage/drivers/localstorage'
import { ImplRepository, RequestError, composeToken } from '::/entities/app'
import type { ApiResponse, Request, Session, Storage } from '::/entities/app'
import type { Token, User } from '::/entities/user'

const instance = axios.create({
  timeout: 10000,
  baseURL: '',
})

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300)
      return response

    return Promise.reject(new RequestError(response.data.msg, response.data.code))
  },
  (error: AxiosError) => {
    return Promise.reject(new RequestError(error.message))
  },
)

const request: Request = {
  get: (url: string, data, config) => instance.get(url, { ...config, params: data }),
  post: (url: string, data, config) => instance.post(url, data, config),
  put: (url: string, data, config) => instance.put(url, data, config),
  delete: (url: string, data, config) => instance.delete(url, { ...config, params: data }),
  patch: (url: string, data, config) => instance.patch(url, data, config),
  headers: instance.defaults.headers.common as Request['headers'],
}

/*****************************************************************************/

interface SessionKeyValue {
  user: User
}

const session: Session<SessionKeyValue> = createStorage({
  driver: sessionStorageDriver({}),
})

/*****************************************************************************/

interface StorageKeyValue {
  token: Token
}

const storage: Storage<StorageKeyValue> = createStorage({
  driver: localStorageDriver({}),
})

/*****************************************************************************/

export class Repository extends ImplRepository {
  protected request = request
  protected storage = storage
  protected session = session
  constructor() {
    super()
  }

  setToken(token: Token) {
    return this.storage.setItem('token', token)
  }

  getToken() {
    return this.storage.getItem('token')
  }

  updateAuthorization(token: Token) {
    this.request.headers.Authorization = composeToken(token)
  }
}

/*****************************************************************************/

export function extractData<T>(res: ApiResponse<T>): ApiResponse<T>['data']['data'] {
  return res.data.data
}
