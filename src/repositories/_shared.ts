import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { createStorage } from 'unstorage'
import sessionStorageDriver from 'unstorage/drivers/session-storage'
import localStorageDriver from 'unstorage/drivers/localstorage'
import type { ApiResponse, ImplRespository, Request, Session, Storage } from '::/entities/app'

const instance = axios.create({
  timeout: 10000,
  baseURL: '',
})

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300)
      return response

    return Promise.reject(response)
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

const request: Request = {
  get: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.get(url, { ...config, params: data }),
  post: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.post(url, data, config),
  put: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.put(url, data, config),
  delete: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.delete(url, { ...config, params: data }),
  patch: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.patch(url, data, config),
  headers: instance.defaults.headers.common as Request['headers'],
}

/*****************************************************************************/

const session: Session = createStorage({
  driver: sessionStorageDriver({}),
})

/*****************************************************************************/

const storage: Storage = createStorage({
  driver: localStorageDriver({}),
})

/*****************************************************************************/

export class Repository implements ImplRespository {
  request = request
  storage = storage
  session = session
  constructor() {}
}

/*****************************************************************************/

/**
 * Extract the 'data' property from the given API response object.
 * @param data - The API response object.
 * @returns The 'data' property from the API response.
 */
export function extractData<T>(data: ApiResponse<T>): ApiResponse<T>['data']['data'] {
  return data.data.data
}
