import type { IUser } from './user'

type RequestData = Record<string, any> | FormData

export interface IRequestConfig {
  method?: string
  headers?: Record<string, any>
  timeout?: number
  signal?: AbortSignal
  withCredentials?: boolean
}

export enum EApiResponseCode {
  Success = 0,
  Failed = 1,
}

export interface IRequestResponse<T> {
  data: T
  status: number
  statusText: string
  headers: Record<string, any>
}

export type IApiResponse<T> = IRequestResponse<{
  code: EApiResponseCode
  msg: string
  data: T
}>

export interface IRequest {
  get: <T>(url: string, data?: RequestData, config?: IRequestConfig) => Promise<IApiResponse<T>>
  delete: <T>(url: string, data?: RequestData, config?: IRequestConfig) => Promise<IApiResponse<T>>
  post: <T>(url: string, data?: RequestData, config?: IRequestConfig) => Promise<IApiResponse<T>>
  put: <T>(url: string, data?: RequestData, config?: IRequestConfig) => Promise<IApiResponse<T>>
  patch: <T>(url: string, data?: RequestData, config?: IRequestConfig) => Promise<IApiResponse<T>>
  controller: () => AbortController
}

interface IStorageKeyValue {
  token: string
}

export interface IStorage {
  getItem: <K extends keyof IStorageKeyValue>(key: K) => Promise<IStorageKeyValue[K] | null>
  setItem: <K extends keyof IStorageKeyValue>(key: K, value: IStorageKeyValue[K]) => Promise<void>
  removeItem: (key: keyof IStorageKeyValue) => Promise<void>
  clear: () => Promise<void>
}

interface ISessionKeyValue {
  user: IUser
}

export interface ISession {
  getItem: <K extends keyof ISessionKeyValue>(key: K) => Promise<ISessionKeyValue[K] | null>
  setItem: <K extends keyof ISessionKeyValue>(key: K, value: ISessionKeyValue[K]) => Promise<void>
  removeItem: (key: keyof ISessionKeyValue) => Promise<void>
  clear: () => Promise<void>
}

export interface IEvents {
  // user state
  'user.logged': IUser
  'user.logOut': void
}

export interface IEventer {
  on: <K extends keyof IEvents>(e: K, fn: (data: IEvents[K]) => void) => void
  off: (e: keyof IEvents) => void
  emit: {
    <K extends keyof IEvents>(type: K, event: IEvents[K]): void
    <K extends keyof IEvents>(type: undefined extends IEvents[K] ? K : never): void
  }
}

/*****************************************************************************/

export interface IAppInfo {
  version: string
}

export interface IAppSetting {
  enabled: boolean
}

export interface IStoreState {
  readonly appInfo: IAppInfo | undefined
  readonly setting: IAppSetting | undefined
  readonly user: IUser | undefined
}

export interface IStoreGetter {
  readonly token: IUser['token'] | undefined
}

export interface IStoreAction {
  setAppInfo: (data?: IAppInfo) => void
  setSetting: (data?: IAppSetting) => void
  setUser: (data?: IUser) => void
}

export interface IStore extends IStoreState, IStoreGetter, IStoreAction {}

export abstract class IRespository {
  abstract request: IRequest
  abstract storage: IStorage
  abstract session: ISession
  abstract eventer: IEventer
}

export abstract class UseCase {
  abstract execute: (params?: any) => Promise<any>
}

/*****************************************************************************/

export function getLocale(): string {
  return 'default'
}

export class AppEntiry {
  constructor() {}

  async setAppInfo(data: IAppInfo, store: IStore) {
    store.setAppInfo(data)
  }

  async setAppSetting(data: IAppSetting, store: IStore) {
    store.setSetting(data)
  };
}
