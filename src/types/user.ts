import type { BaseFilters, UrlState } from "./filtering"
export interface User {
  id: number
  name: string
  email: string
  role: string
  active: boolean
}

export interface UserFilters extends BaseFilters {
  role: string
  active: string
}

export interface UserUrlState extends UrlState {
  role: string
  active: string
}

export interface UserCreateInput {
  name: string
  email: string
  password: string
  role: string
}

export interface UserUpdateInput {
  id: number
  name: string
  email: string
  password?: string
  role: string
}
