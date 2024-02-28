import { ApiResponseCode } from '../../src/entities/app.model'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (_event, response) => {
    response.body = Object.assign({
      code: ApiResponseCode.Succeeded,
    }, response.body)
  })
})
