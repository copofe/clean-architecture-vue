import type { App, Plugin } from 'vue'

const plugins = import.meta.glob(['./*.ts'], { eager: true, import: 'default' })

export function setupPlugins(app: App) {
  Object.entries(plugins).forEach(([_path, plugin]) => {
    app.use(plugin as Plugin)
  })
}
