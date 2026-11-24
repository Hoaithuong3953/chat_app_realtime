import { setAccessTokenGetter } from '@/services/api'
import { useAuthStore } from '@/features/auth/auth.store'

export function setupAuth(): void {
  setAccessTokenGetter(
    () => useAuthStore.getState().accessToken,
  )
}