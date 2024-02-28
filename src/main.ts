// import { appUsecase } from '::/usecases/app'
import { ApiResponseCode, RequestError } from '::/entities/app.model'
import { userRepo } from '::/repositories/user'
import { useStore } from '::/view/store'
import router from '::/view/router'
import i18n, { loadLanguageAsync } from '::/view/plugins/i18n'
import store from '::/view/plugins/pinia'
import App from '::/view/App.vue'
import '::/view/styles/index.css'

RequestError.errorHandler = (err) => {
  // if you use RESTful API, you only need to check if the error code returned equals 401.
  if (err.code === ApiResponseCode.UnAuthorized || err.code === 401)
    userRepo.clearToken().then(() => router.push({ name: 'SignIn' }))
}

async function setup() {
  const app = createApp(App)
  app
    .use(store)
    .use(i18n)
    .use(router)

  return app
}

async function initialize() {
  const store = useStore()
  // const [{ appInfo, appSetting }] = await Promise.all([appUsecase.initialize(), loadLanguageAsync(store.language)])
  await Promise.all([loadLanguageAsync(store.language)])

  // store.appInfo = appInfo
  // store.setting = appSetting
}

async function bootstrap() {
  const app = await setup()
  await initialize()
  app.mount('#app')
}

bootstrap()
