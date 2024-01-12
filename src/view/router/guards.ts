import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { useStore } from '../store'
import { AppRepo } from '::/repositories/app'

export async function auth(to: RouteLocationNormalized): Promise<void | RouteLocationRaw> {
  const appRepo = new AppRepo(useStore())
  const isLogged = await appRepo.getToken()
  if (!isLogged) {
    return {
      path: 'Login',
      query: { redirect: encodeURIComponent(to.fullPath) },
    }
  }
}

export function permission(): void {
  return undefined
}
