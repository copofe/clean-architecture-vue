import { createPinia, defineStore } from 'pinia'
import type { ToRefs } from 'vue'
import type { AppInfo, AppSetting, StoreAction, StoreGetter, StoreState } from '::/entities/app'
import type { User } from '::/entities/user'

type Store = ToRefs<StoreState> & ToRefs<StoreGetter> & StoreAction

export const useStore = defineStore('root', (): Store => {
  const appInfo = ref<AppInfo | undefined>()
  function setAppInfo(data?: AppInfo) {
    appInfo.value = data
  }

  const setting = ref<AppSetting | undefined>()
  function setSetting(data?: AppSetting) {
    setting.value = data
  }

  const user = ref<User | undefined>()

  function setUser(data?: User) {
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
