import type { NavigationGuard } from 'vue-router'
import { userRepo } from '::/repositories/user'

export const authenticate: NavigationGuard = async (to) => {
  const isLogged = await userRepo.getToken()
  if (!isLogged) {
    return {
      name: 'SignIn',
      query: { redirect: encodeURIComponent(to.fullPath) },
    }
  }
}

export async function proceedIfAuthenticated() {
  const isLogged = await userRepo.getToken()
  if (isLogged) {
    toast.info('you already signed in.')
    return {
      name: 'Home',
    }
  }
}
