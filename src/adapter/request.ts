import type { AxiosError } from 'axios'
import axios from 'axios'
import type { Request } from '::/impl'
import { ApiResponseCode, RequestError } from '::/impl'

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
    if (response.data.code === ApiResponseCode.Succeeded)
      return response

    return Promise.reject(new RequestError(response.data.msg, response.data.code))
  },
  (error: AxiosError) => {
    return Promise.reject(new RequestError(error.message, error.response?.status))
  },
)

export const request: Request = {
  get: (url, params, config) => instance.get(url, { ...config, params }),
  delete: (url, params, config) => instance.delete(url, { ...config, params }),
  post: (url, data, config) => instance.post(url, data, config),
  put: (url, data, config) => instance.put(url, data, config),
  patch: (url, data, config) => instance.patch(url, data, config),
  headers: instance.defaults.headers.common as Request['headers'],
}
