import { AppInitUsecase } from '::/usecases/app'
import { storer, useStore } from '::/view/store'
import router from '::/view/router'
import App from '::/view/App.vue'
import '::/assets/index.css'

function setup() {
  const app = createApp(App)
  app
    .use(storer)
    .use(router)
  return app
}

/**
 * 初始化应用配置和信息
 */
async function initialize() {
  const store = useStore()
  const appUsecase = new AppInitUsecase(store)
  await appUsecase.execute()
}

async function bootstrap() {
  const app = setup()
  await initialize()
  app.mount('#app')
}

bootstrap()
