export interface BaseEntity {
  id: string | number
  name: string
  createdAt?: string
  updatedAt?: string
}

export interface FilterConfig<T> {
  searchFields: (keyof T)[]
  filterFields: {
    [K in keyof T]?: {
      type: "select" | "multiselect" | "date" | "boolean"
      options?: Array<{ label: string; value: string | number }>
      label: string
    }
  }
  sortFields?: Array<{
    key: keyof T
    label: string
  }>
}

export interface BaseFilters {
  search: string
  page: number
  limit: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface UrlState extends Record<string, any> {
  tab: string
  search: string
  page: number
  limit: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginatedResult<T> {
  data: T[]
  meta: PaginationMeta
}
