export interface User {
  id: number
  name: string
  email: string
  role: string
  active: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken?: string
}

export interface ApiResponse<T = unknown> {
  message: string
  data: T
  success: boolean
}
