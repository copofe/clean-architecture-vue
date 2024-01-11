import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { storage } from '.'
import type { IRequest } from '::/entities/app'
import { getToken } from '::/entities/user'

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

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken(storage)
    if (token)
      config.headers.Authorization = `Bearer ${token}`

    return config
  },
)

const request: IRequest = {
  get: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.get(url, { ...config, params: data }),
  post: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.post(url, data, config),
  put: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.put(url, data, config),
  delete: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.delete(url, { ...config, params: data }),
  patch: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => instance.patch(url, data, config),
  controller: () => new AbortController(),
}

export default request
