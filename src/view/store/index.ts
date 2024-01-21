import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { AppInfo, AppSetting } from '::/entities/app'
import type { User } from '::/entities/user'

export const useStore = defineStore('root', () => {
  const appInfo = ref<AppInfo>()

  const setting = ref<AppSetting>()

  const user = ref<User>()

  const language: Ref<string> = useLocalStorage('language', navigator.language)

  return {
    appInfo,
    setting,
    user,
    language,
  }
})
