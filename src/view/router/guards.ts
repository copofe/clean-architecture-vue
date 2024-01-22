import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { userRepo } from '::/repositories/user'

export async function auth(to: RouteLocationNormalized): Promise<void | RouteLocationRaw> {
  const isLogged = await userRepo.getToken()
  if (!isLogged) {
    return {
      name: 'SignIn',
      query: { redirect: encodeURIComponent(to.fullPath) },
    }
  }
}
