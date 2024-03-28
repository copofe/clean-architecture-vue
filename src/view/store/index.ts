import { defineStore, storeToRefs } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { AppInfo, AppSetting, Language } from '::/entities/app.model'
import type { User } from '::/entities/user.model'
import { eventer } from '::/internal/eventer'

export const useStore = defineStore('global', () => {
  const appInfo = ref<AppInfo>()

  const setting = ref<AppSetting>()

  const user = ref<User>()

  // persist state in this way, alternatively, you can use pinia-plugin-persistedstate
  const language: Ref<Language> = useLocalStorage<Language>('language', navigator.language)

  return {
    appInfo,
    setting,
    user,
    language,
  }
})

export const useStoreRefs = () => storeToRefs(useStore())

eventer.on('update.appInfo', (data) => {
  useStore().appInfo = data
})
eventer.on('update.setting', (data) => {
  useStore().setting = data
})
eventer.on('update.user', (data) => {
  useStore().user = data
})
eventer.on('update.language', (data) => {
  useStore().language = data
})
