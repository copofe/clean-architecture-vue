import type { AppInfo } from '../../../src/entities/app.model'

export default defineEventHandler((): AppInfo => {
  return { version: '1.0.0' }
})
