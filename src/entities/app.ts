import type { User } from './user'

export type Token = string | null

type RequestData = Record<string, any> | FormData

export interface RequestConfig {
  method?: string
  headers?: Record<string, any>
  timeout?: number
  signal?: AbortSignal
  withCredentials?: boolean
}

export enum ApiResponseCode {
  Success = 0,
  Failed = 1,
}

export interface RequestResponse<T> {
  data: T
  status: number
  statusText: string
  headers: Record<string, any>
}

export type ApiResponse<T> = RequestResponse<{
  code: ApiResponseCode
  msg: string
  data: T
}>

export interface Request {
  get: <T>(url: string, data?: RequestData, config?: RequestConfig) => Promise<ApiResponse<T>>
  delete: <T>(url: string, data?: RequestData, config?: RequestConfig) => Promise<ApiResponse<T>>
  post: <T>(url: string, data?: RequestData, config?: RequestConfig) => Promise<ApiResponse<T>>
  put: <T>(url: string, data?: RequestData, config?: RequestConfig) => Promise<ApiResponse<T>>
  patch: <T>(url: string, data?: RequestData, config?: RequestConfig) => Promise<ApiResponse<T>>
  headers: {
    Authorization: string | null
    [key: string]: string | string[] | number | boolean | null
  }
}

interface StorageKeyValue {
  token: Token
}

export interface Storage {
  getItem: <K extends keyof StorageKeyValue>(key: K) => Promise<StorageKeyValue[K] | null>
  setItem: <K extends keyof StorageKeyValue>(key: K, value: StorageKeyValue[K]) => Promise<void>
  removeItem: (key: keyof StorageKeyValue) => Promise<void>
  clear: () => Promise<void>
}

interface SessionKeyValue {
  user: User
}

export interface Session {
  getItem: <K extends keyof SessionKeyValue>(key: K) => Promise<SessionKeyValue[K] | null>
  setItem: <K extends keyof SessionKeyValue>(key: K, value: SessionKeyValue[K]) => Promise<void>
  removeItem: (key: keyof SessionKeyValue) => Promise<void>
  clear: () => Promise<void>
}

export interface Events {
  // user state
  'user.logged': User
  'user.logOut': void
}

export interface Eventer {
  on: <K extends keyof Events>(e: K, fn: (data: Events[K]) => void) => void
  off: (e: keyof Events) => void
  emit: {
    <K extends keyof Events>(type: K, event: Events[K]): void
    <K extends keyof Events>(type: undefined extends Events[K] ? K : never): void
  }
}

export abstract class ImplRespository {
  abstract request: Request
  abstract storage: Storage
  abstract session: Session
}

/*****************************************************************************/

export interface AppInfo {
  version: string
}

export interface AppSetting {
  enabled: boolean
}

/*****************************************************************************/

export interface StoreState {
  readonly appInfo: AppInfo | undefined
  readonly setting: AppSetting | undefined
  readonly user: User | undefined
}

export interface StoreGetter {}

export interface StoreAction {
  setAppInfo: (data?: AppInfo) => void
  setSetting: (data?: AppSetting) => void
  setUser: (data?: User) => void
}

export interface Store extends StoreState, StoreGetter, StoreAction {}

/*****************************************************************************/

export function getLocale(): string {
  return 'default'
}

export function composeToken(token: Token): string {
  return token ? `Bearer ${token}` : ''
}
