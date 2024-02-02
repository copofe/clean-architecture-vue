import type { AppSetting } from '../../../src/entities/app.model'

export default defineEventHandler((): AppSetting => {
  return { enabled: true }
})
