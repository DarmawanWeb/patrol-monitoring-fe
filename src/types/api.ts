export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedApiResponse<T> {
  success: boolean
  message: string
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  error?: string
  statusCode: number
}
