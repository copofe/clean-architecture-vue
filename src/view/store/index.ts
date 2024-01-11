import { createPinia, defineStore } from 'pinia'
import type { ToRefs } from 'vue'
import type { IAppInfo, IAppSetting, IStoreAction, IStoreGetter, IStoreState } from '::/entities/app'
import type { IUser } from '::/entities/user'

type IStore = ToRefs<IStoreState> & ToRefs<IStoreGetter> & IStoreAction

export const useStore = defineStore('global', (): IStore => {
  const appInfo = ref<IAppInfo | undefined>()
  function setAppInfo(data?: IAppInfo) {
    appInfo.value = data
  }

  const setting = ref<IAppSetting | undefined>()
  function setSetting(data?: IAppSetting) {
    setting.value = data
  }

  const user = ref<IUser | undefined>()

  function setUser(data?: IUser) {
    user.value = data
  }

  const token = computed(() => user.value?.token)

  return {
    appInfo,
    setAppInfo,
    setting,
    setSetting,
    user,
    setUser,
    token,
  }
})

export const storer = createPinia()
