import type { AppSetting } from '../../../src/entities/app.model'

export default defineEventHandler((): { data: AppSetting } => {
  return { data: { enabled: true } }
})
