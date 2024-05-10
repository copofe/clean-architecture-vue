import { defineStore, storeToRefs } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import router, { setRouteDocumentTitle } from '../routes'
import type { AppInfo, AppSetting, Language } from '::/entities/app.model'
import type { User } from '::/entities/user.model'

export const useStore = defineStore('global', () => {
  const appInfo = ref<AppInfo>()

  function setAppInfo(data: AppInfo) {
    appInfo.value = data
  }

  const appSetting = ref<AppSetting>()
  function setAppSetting(data: AppSetting) {
    appSetting.value = data
  }

  const user = ref<User>()
  function setUser(data: User) {
    user.value = data
  }

  // persist state in this way, alternatively, you can use pinia-plugin-persistedstate
  const language: Ref<Language> = useLocalStorage<Language>('language', navigator.language)
  function setLanguage(data: Language) {
    language.value = data
    setRouteDocumentTitle(router.currentRoute.value.meta.title)
  }

  return {
    appInfo,
    appSetting,
    user,
    language,
    setAppInfo,
    setAppSetting,
    setUser,
    setLanguage,
  }
})

export const useStoreRefs = () => storeToRefs(useStore())
