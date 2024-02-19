import type { AxiosError } from 'axios'
import axios from 'axios'
import { ApiResponseCode, RequestError } from '::/entities/app.model'
import type { Request } from '::/entities/app.model'

const instance = axios.create({
  baseURL: `${import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL}/api`,
})

instance.interceptors.request.use((config) => {
  if (import.meta.env.DEV && import.meta.env.VITE_MOCK_ENABLE === 'true' && import.meta.env.VITE_MOCK_GLOBAL === 'true')
    config.headers['x-mock'] = import.meta.env.VITE_MOCK_GLOBAL

  return config
})

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300 && response.data.code === ApiResponseCode.Succeeded)
      return response

    return Promise.reject(new RequestError(response.data.msg, response.data.code))
  },
  (error: AxiosError) => {
    return Promise.reject(new RequestError(error.message))
  },
)

export const request: Request = {
  get: (url: string, data, config) => instance.get(url, { ...config, params: data }),
  post: (url: string, data, config) => instance.post(url, data, config),
  put: (url: string, data, config) => instance.put(url, data, config),
  delete: (url: string, data, config) => instance.delete(url, { ...config, params: data }),
  patch: (url: string, data, config) => instance.patch(url, data, config),
  headers: instance.defaults.headers.common as Request['headers'],
}
