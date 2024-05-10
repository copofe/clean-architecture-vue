import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useStore } from './index'

describe('root store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize appInfo to undefined', () => {
    const store = useStore()
    expect(store.appInfo).toBeUndefined()
  })

  it('should initialize setting to undefined', () => {
    const store = useStore()
    expect(store.appSetting).toBeUndefined()
  })

  it('should initialize user to undefined', () => {
    const store = useStore()
    expect(store.user).toBeUndefined()
  })

  it('should initialize language from localStorage per default', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(navigator.language)
    const store = useStore()
    expect(store.language).toBe(navigator.language)
  })

  it('should update appInfo when set appInfo', () => {
    const store = useStore()
    store.appInfo = {
      version: '1.0.0',
    }
    expect(store.appInfo).toEqual({
      version: '1.0.0',
    })
  })

  it('should update setting when set setting', () => {
    const store = useStore()
    store.appSetting = {
      enabled: true,
    }
    expect(store.appSetting).toEqual({
      enabled: true,
    })
  })

  it('should update user when set user', () => {
    const store = useStore()
    store.user = {
      id: 1,
      username: 'test',
      permission: [],
    }
    expect(store.user).toEqual({
      id: 1,
      username: 'test',
      permission: [],
    })
  })

  it('should update language when set language', () => {
    const store = useStore()
    store.language = 'zh-CN'
    expect(store.language).toBe('zh-CN')
  })
})
