export class StandardError extends Error {
  constructor(public message: string, public name: string = 'Error') {
    super(message)
    this.name = name
  }
}

export type Language = NavigatorLanguage['language']

export type Token = string | null

export type Permission = string

export interface AppInfo {
  version: string
}

export interface AppSetting {
  enabled: boolean
}

/******************************************************************************/

export interface RequestConfig {
  method?: string
  headers?: Record<string, any>
  timeout?: number
  signal?: AbortSignal
  withCredentials?: boolean
}

export enum ApiResponseCode {
  Succeeded = 10000,
  Unauthorized = 10401,
}

export interface RequestResponse<T> {
  data: T
  status: number
  statusText: string
  headers: Record<string, any>
}

export class RequestError extends StandardError {
  static handler: (err: RequestError) => void
  constructor(public message: string, public code?: number) {
    super(message, 'RequestError')
    RequestError.handler(this)
  }
}

export type ApiResponse<T> = RequestResponse<{
  code: ApiResponseCode
  msg?: string
  data: T
}>

type RequestParams = Record<string, any>
type RequestData = Record<string, any> | FormData

export interface Request {
  get: <T>(url: string, params?: RequestParams, config?: RequestConfig) => Promise<ApiResponse<T>>
  delete: <T>(url: string, params?: RequestData, config?: RequestConfig) => Promise<ApiResponse<T>>
  post: <T>(url: string, data?: RequestData, config?: RequestConfig) => Promise<ApiResponse<T>>
  put: <T>(url: string, data?: RequestData, config?: RequestConfig) => Promise<ApiResponse<T>>
  patch: <T>(url: string, data?: RequestData, config?: RequestConfig) => Promise<ApiResponse<T>>
  headers: {
    [key: string]: string | string[] | number | boolean | null
  }
}

export interface Storage<KV extends Record<string, any>> {
  getItem: <K extends keyof KV>(key: K) => Promise<KV[K] | null>
  setItem: <K extends keyof KV>(key: K, value: KV[K]) => Promise<void>
  removeItem: (key: keyof KV) => Promise<void>
  clear: () => Promise<void>
}

export interface Session<KV extends Record<string, any>> {
  getItem: <K extends keyof KV>(key: K) => Promise<KV[K] | null>
  setItem: <K extends keyof KV>(key: K, value: KV[K]) => Promise<void>
  removeItem: (key: keyof KV) => Promise<void>
  clear: () => Promise<void>
}

export interface Eventer<Events extends Record<string, any>> {
  on: <K extends keyof Events>(e: K, fn: (data: Events[K]) => void) => void
  off: (e: keyof Events) => void
  emit: {
    <K extends keyof Events>(type: K, event: Events[K]): void
    <K extends keyof Events>(type: undefined extends Events[K] ? K : never): void
  }
}

/******************************************************************************/

export abstract class ImplRepository {
  protected abstract request: Request
  protected abstract storage: Storage<any>
  protected abstract session: Session<any>
}

export abstract class ImplUsecase {
}
