import { ApiResponseCode, RequestError } from '::/implement'
import { appEntity } from '::/entities/app.entity'
import { appUsecase } from '::/usecases/app'
import { setupPlugins } from '::/view/plugins'
import router from '::/view/routes'
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
        router.replace({ name: 'SignIn', query: { redirect: encodeURIComponent(router.currentRoute.value.fullPath) } })
      })
    }
  }
}

async function main() {
  const app = setup()
  bootstrap()
  const { setAppInfo, setAppSetting, setUser } = useStore()
  appUsecase.initialize({
    setAppInfo,
    setAppSetting,
    setUser,
  })

  app.mount('#app')
}

main()
