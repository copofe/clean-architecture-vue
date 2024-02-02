export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (_event, response) => {
    response.body = {
      data: response.body,
      code: 20000,
      msg: 'success',
    }
  })
})
