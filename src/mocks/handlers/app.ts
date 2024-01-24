import type { RequestHandler } from 'msw'
import { http } from 'msw'
import { stdResponse } from './_shared'
import type { AppInfo, AppSetting } from '::/entities/app'

const handles: RequestHandler[] = [
  http.get('/api/app', () => {
    return stdResponse<AppInfo>({
      version: '1.0.0',
    })
  }),
  http.get('/api/app/setting', () => {
    return stdResponse<AppSetting>({
      enabled: true,
    })
  }),
]

export default handles
