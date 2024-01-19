import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { useStore } from '../store'
import { UserRepo } from '::/repositories/user'
import { havePermission } from '::/entities/app'

export async function auth(to: RouteLocationNormalized): Promise<void | RouteLocationRaw> {
  const userRepo = new UserRepo()
  const isLogged = await userRepo.getToken()
  if (!isLogged) {
    return {
      name: 'Login',
      query: { redirect: encodeURIComponent(to.fullPath) },
    }
  }
}

export function permission(to: RouteLocationNormalized): void | RouteLocationRaw {
  const store = useStore()
  if (to.meta.permission && havePermission(store.user!.permission, to.meta.permission)) { return undefined }
  else {
    return {
      name: 'PermissionDenied',
    }
  }
}
