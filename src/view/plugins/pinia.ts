import { createPinia } from 'pinia'
import { loadLanguageAsync } from './i18n'
import { AppUsecase } from '::/usecases/app'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.$subscribe((mutation, state) => {
    loadLanguageAsync(state.language)
    const appUsecase = new AppUsecase()
    appUsecase.setLanguage(state.language)
  })
})

export default pinia
