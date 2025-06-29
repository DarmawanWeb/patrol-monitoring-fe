import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { robotService } from "@/service/robots/robot-service"
import type {
  RobotCreateInput,
  RobotUpdateInput,
  TypeCreateInput,
  TypeUpdateInput,
} from "@/types/robot"

export const robotKeys = {
  all: ["robots"] as const,
  lists: () => [...robotKeys.all, "list"] as const,
  types: () => [...robotKeys.all, "types"] as const,
}

export const useAllRobots = () => {
  return useQuery({
    queryKey: robotKeys.lists(),
    queryFn: () => robotService.getAllRobots(100),
    staleTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useRobotTypes = () => {
  return useQuery({
    queryKey: robotKeys.types(),
    queryFn: () => robotService.getRobotTypes(),
    staleTime: 15 * 60 * 1000,
    retry: 3,
  })
}

export const useCreateRobot = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RobotCreateInput) => robotService.createRobot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: robotKeys.lists() })
      toast.success("Robot created successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create robot")
    },
  })
}

export const useUpdateRobot = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RobotUpdateInput) => robotService.updateRobot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: robotKeys.lists() })
      toast.success("Robot updated successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update robot")
    },
  })
}

export const useDeleteRobot = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => robotService.deleteRobot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: robotKeys.lists() })
      toast.success("Robot deleted successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete robot")
    },
  })
}

export const useCreateRobotType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TypeCreateInput) => robotService.createRobotType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: robotKeys.types() })
      toast.success("Robot type created successfully")
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create robot type",
      )
    },
  })
}

export const useUpdateRobotType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TypeUpdateInput) => robotService.updateRobotType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: robotKeys.types() })
      toast.success("Robot type updated successfully")
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update robot type",
      )
    },
  })
}

export const useDeleteRobotType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => robotService.deleteRobotType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: robotKeys.types() })
      toast.success("Robot type deleted successfully")
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete robot type",
      )
    },
  })
}
