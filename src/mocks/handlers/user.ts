import type { RequestHandler } from 'msw'
import { delay, http } from 'msw'
import { stdResponse } from './_shared'
import type { User } from '::/entities/user'

const handles: RequestHandler[] = [
  http.post('/api/user/login', async () => {
    await delay(300)
    return stdResponse('123abc')
  }),
  http.post('/api/user/logout', () => {
    return stdResponse(undefined)
  }),
  http.get('/api/user', () => {
    return stdResponse<User>({
      id: 1,
      username: 'admin',
      permission: [],
    })
  }),
]

export default handles
