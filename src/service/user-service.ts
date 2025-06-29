import { api } from "@/lib/axios"
import type { ApiResponse, PaginatedApiResponse } from "@/types/api"
import type { User, UserCreateInput, UserUpdateInput } from "@/types/user"

class UserService {
  private static instance: UserService

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async getAllUsers(limit: number = 100): Promise<PaginatedApiResponse<User>> {
    const params = new URLSearchParams()
    params.append("page", "1")
    params.append("limit", limit.toString())

    const url = `/users?${params.toString()}`
    const res = await api.get<PaginatedApiResponse<User>>(url)

    if (res.data.success) {
      return res.data
    } else {
      throw new Error(res.data.message || "API returned unsuccessful response")
    }
  }

  async createUser(data: UserCreateInput): Promise<User> {
    const res = await api.post<ApiResponse<User>>("/users", {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    })

    if (res.data.success) {
      return res.data.data
    } else {
      throw new Error(res.data.message || "Failed to create user")
    }
  }

  async updateUser(data: UserUpdateInput): Promise<User> {
    const updatePayload: any = {
      name: data.name,
      email: data.email,
      role: data.role,
    }

    if (data.password && data.password.trim() !== "") {
      updatePayload.password = data.password
    }

    const res = await api.put<ApiResponse<User>>(
      `/users/${data.id}`,
      updatePayload,
    )

    if (res.data.success) {
      return res.data.data
    } else {
      throw new Error(res.data.message || "Failed to update user")
    }
  }

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`)
  }

  async toggleUserStatus(id: number): Promise<User> {
    const res = await api.patch<ApiResponse<User>>(`/users/${id}/toggle-status`)

    if (res.data.success) {
      return res.data.data
    } else {
      throw new Error(res.data.message || "Failed to toggle user status")
    }
  }
}

export const userService = UserService.getInstance()
