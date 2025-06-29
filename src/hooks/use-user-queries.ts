import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { userService } from "@/service/user-service"
import type { UserCreateInput, UserUpdateInput } from "@/types/user"

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
}

export const useAllUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => userService.getAllUsers(100),
    staleTime: 10 * 60 * 1000,
    retry: 3,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserCreateInput) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      toast.success("User created successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create user")
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserUpdateInput) => userService.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      toast.success("User updated successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update user")
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      toast.success("User deleted successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete user")
    },
  })
}

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => userService.toggleUserStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      toast.success("User status updated successfully")
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update user status",
      )
    },
  })
}
