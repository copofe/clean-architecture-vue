import { RequestError } from '::/entities/app'
import { appUsecase } from '::/usecases/app'
import { useStore } from '::/view/store'
import router from '::/view/router'
import i18n, { loadLanguageAsync } from '::/view/plugins/i18n'
import store from '::/view/plugins/pinia'
import App from '::/view/App.vue'
import '::/view/styles/index.css'

function setup() {
  const app = createApp(App)
  app
    .use(store)
    .use(i18n)
    .use(router)

  app.config.errorHandler = (err, _vm, _info) => {
    if (err instanceof RequestError)
      // TODO: show error by notification or toast
      console.error(err)

    else
      console.error(err)
  }

  return app
}

async function initialize() {
  const store = useStore()
  const [{ appInfo, appSetting }] = await Promise.all([appUsecase.initialize(), loadLanguageAsync(store.language)])

  store.appInfo = appInfo
  store.setting = appSetting
}

async function bootstrap() {
  const app = setup()
  await initialize()
  app.mount('#app')
}

bootstrap()
