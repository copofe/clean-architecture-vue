import type { NavigationGuard } from 'vue-router'
import { userRepo } from '::/repositories/user'

export const auth: NavigationGuard = async (to) => {
  const isLogged = await userRepo.getToken()
  if (!isLogged) {
    return {
      name: 'SignIn',
      query: { redirect: encodeURIComponent(to.fullPath) },
    }
  }
}
