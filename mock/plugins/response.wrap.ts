import { ApiResponseCode } from '../../src/impl'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (_event, response) => {
    response.body = Object.assign({
      code: ApiResponseCode.Succeeded,
    }, response.body)
  })
})
