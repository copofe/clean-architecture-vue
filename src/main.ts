import { ApiResponseCode, RequestError } from '::/impl'
import { appEntity } from '::/entities/app.entity'
import { appUsecase } from '::/usecases/app'
import { eventer } from '::/internal/eventer'
import { setupPlugins } from '::/view/plugins'
import router, { setRouteDocumentTitle } from '::/view/routes'
import App from '::/view/App.vue'
import '::/view/App.css'

function setup() {
  const app = createApp(App)
  setupPlugins(app)
  app.use(router)

  return app
}

function bootstrap() {
  RequestError.handler = function (err: RequestError) {
    if (err.message)
      toast.error(err.message)
    if (err.code === ApiResponseCode.Unauthorized) {
      appEntity.clearToken().then(() => {
        eventer.emit('error.unauthorized')
      })
    }
  }

  const { appInfo, setting, user, language } = useStoreRefs()

  eventer.on('update.appInfo', data => appInfo.value = data)
  eventer.on('update.setting', data => setting.value = data)
  eventer.on('update.user', data => user.value = data)
  eventer.on('update.language', data => language.value = data)
  eventer.on('update.language', () => {
    setRouteDocumentTitle(router.currentRoute.value.meta.title)
  })
  eventer.on('error.unauthorized', () => {
    router.replace({ name: 'SignIn', query: { redirect: encodeURIComponent(router.currentRoute.value.fullPath) } })
  })
}

async function main() {
  const app = setup()
  bootstrap()
  await appUsecase.initialize()

  app.mount('#app')
}

main()
