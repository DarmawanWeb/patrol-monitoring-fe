import { useEffect } from "react"
import { authService } from "@/service/auth-service"
import { useAuthStore } from "@/stores/auth-store"
import { useCurrentUser } from "./queries/use-auth-queries"

export const useAuth = () => {
  const { user: persistedUser, isHydrated, setUser } = useAuthStore()
  const {
    data: serverUser,
    isLoading: isQueryLoading,
    error,
    refetch: refetchUser,
  } = useCurrentUser()

  useEffect(() => {
    if (serverUser && serverUser !== persistedUser) {
      setUser(serverUser)
    }
  }, [serverUser, persistedUser, setUser])

  const hasTokens = authService.isAuthenticated()
  const isAuthenticated = hasTokens && !!persistedUser

  const isLoading =
    !isHydrated || (hasTokens && isQueryLoading && !persistedUser)

  return {
    user: persistedUser,
    isLoading,
    isAuthenticated,
    isHydrated,
    error,
    refetchUser,
  }
}
