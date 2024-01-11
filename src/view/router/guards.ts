import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { storage } from '::/lib'
import { isLogged } from '::/entities/user'

export async function auth(to: RouteLocationNormalized): Promise<void | RouteLocationRaw> {
  const logged = await isLogged(storage)
  if (!logged) {
    return {
      path: 'Login',
      query: { redirect: encodeURIComponent(to.fullPath) },
    }
  }
}

export function permission(): void {
  return undefined
}
