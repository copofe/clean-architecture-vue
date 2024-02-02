// import { appUsecase } from '::/usecases/app'
import { RequestError } from '::/entities/app.model'
import { useStore } from '::/view/store'
import router from '::/view/router'
import i18n, { loadLanguageAsync } from '::/view/plugins/i18n'
import store from '::/view/plugins/pinia'
import { registerEventHub } from '::/view/eventHub'
import App from '::/view/App.vue'
import '::/view/styles/index.css'

function errorHandler(err: unknown) {
  // Global error handler
  if (err instanceof RequestError)
  // TODO: show error by notification or toast
    console.error(err)

  else
    console.error(err)
}

async function setup() {
  const app = createApp(App)
  app
    .use(store)
    .use(i18n)
    .use(router)

  app.config.errorHandler = errorHandler

  return app
}

async function initialize() {
  const store = useStore()
  // const [{ appInfo, appSetting }] = await Promise.all([appUsecase.initialize(), loadLanguageAsync(store.language)])
  await Promise.all([loadLanguageAsync(store.language)])

  // store.appInfo = appInfo
  // store.setting = appSetting

  registerEventHub()
}

async function bootstrap() {
  const app = await setup()
  await initialize()
  app.mount('#app')
}

bootstrap()
