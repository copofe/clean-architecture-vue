import type { AppInfo } from '../../../src/entities/app.model'

export default defineEventHandler((): { data: AppInfo } => {
  return { data: { version: '1.0.0' } }
})
