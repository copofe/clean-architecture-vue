import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { useStore } from '../store'
import { UserRepo } from '::/repositories/user'

export async function auth(to: RouteLocationNormalized): Promise<void | RouteLocationRaw> {
  const userRepo = new UserRepo(useStore())
  const isLogged = await userRepo.getToken()
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
