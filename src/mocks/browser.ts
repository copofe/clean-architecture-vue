import { setupWorker } from 'msw/browser'
import app from './handlers/app'
import user from './handlers/user'

const worker = setupWorker(...[
  ...app,
  ...user,
])

export function startMock() {
  return worker.start({
    onUnhandledRequest(request, print) {
      // Ignore any requests not containing "/api" in their URL.
      if (!request.url.includes('/api'))
        return

      // Otherwise, print an unhandled request warning.
      print.warning()
    },
  })
}
