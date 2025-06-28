"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, type ReactNode, useContext, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useLogin, useLogout } from "@/hooks/use-auth-queries"
import { authService } from "@/service/auth-service"
import type { LoginRequest, User } from "@/types/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (c: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  refetchUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const PUBLIC_ROUTES = ["/auth", "/login", "/register", "/forgot-password", "/"]

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const { user, isLoading, isAuthenticated, refetchUser } = useAuth()
  const loginMut = useLogin()
  const logoutMut = useLogout()

  const isPublic = PUBLIC_ROUTES.includes(pathname)

  const login = async (c: LoginRequest) => {
    await loginMut.mutateAsync(c)
    router.replace("/dashboard")
  }

  const logout = async () => {
    await logoutMut.mutateAsync()
    router.replace("/auth")
  }

  useEffect(() => {
    if (isLoading) return

    const hasAuth = authService.isAuthenticated()

    if (isPublic && hasAuth && user) {
      router.replace("/dashboard")
    } else if (!isPublic && !hasAuth) {
      router.replace("/auth")
    } else if (!isPublic && hasAuth && !user) {
      refetchUser()
    }
  }, [isLoading, user, refetchUser, isPublic, router])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout, refetchUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuthContext must be inside <AuthProvider>")
  return ctx
}
