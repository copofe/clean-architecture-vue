import { RequestError } from '::/entities/app'
import { AppUsecase } from '::/usecases/app'
import { store, useStore } from '::/view/store'
import router from '::/view/router'
import App from '::/view/App.vue'
import '::/view/styles/index.css'

function setup() {
  const app = createApp(App)
  app
    .use(store)
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
  const appUsecase = new AppUsecase(store)
  await appUsecase.initialize()
}

async function bootstrap() {
  const app = setup()
  await initialize()
  app.mount('#app')
}

bootstrap()
