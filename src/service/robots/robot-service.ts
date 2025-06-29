import { api } from "@/lib/axios"
import type { ApiResponse, PaginatedApiResponse } from "@/types/api"
import type {
  Robot,
  RobotCreateInput,
  RobotTypeResponse,
  RobotUpdateInput,
  TypeCreateInput,
  TypeUpdateInput,
} from "@/types/robot"

class RobotService {
  private static instance: RobotService

  static getInstance() {
    if (!RobotService.instance) {
      RobotService.instance = new RobotService()
    }
    return RobotService.instance
  }

  async getAllRobots(
    limit: number = 100,
  ): Promise<PaginatedApiResponse<Robot>> {
    const params = new URLSearchParams()
    params.append("page", "1")
    params.append("limit", limit.toString())

    const url = `/robots/robots?${params.toString()}`
    const res = await api.get<PaginatedApiResponse<Robot>>(url)

    if (res.data.success) {
      return res.data
    } else {
      throw new Error(res.data.message || "API returned unsuccessful response")
    }
  }

  async getRobotTypes(): Promise<RobotTypeResponse[]> {
    try {
      const res =
        await api.get<ApiResponse<RobotTypeResponse[]>>("/robots/types")

      if (res.data.success) {
        return res.data.data
      } else {
        throw new Error(res.data.message || "Failed to fetch robot types")
      }
    } catch (error) {
      console.error("🚨 Robot Types Error:", error)
      throw error
    }
  }

  async createRobot(data: RobotCreateInput): Promise<Robot> {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("typeId", data.typeId.toString())
    formData.append("description", data.description)

    if (data.imageFile) {
      formData.append("image", data.imageFile)
    }

    const res = await api.post<ApiResponse<Robot>>("/robots/robots", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data.data
  }

  async updateRobot(data: RobotUpdateInput): Promise<Robot> {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("typeId", data.typeId.toString())
    formData.append("description", data.description)

    if (data.imageFile) {
      formData.append("image", data.imageFile)
    }

    const res = await api.put<ApiResponse<Robot>>(
      `/robots/robots/${data.id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    )
    return res.data.data
  }

  async deleteRobot(id: string): Promise<void> {
    await api.delete(`/robots/robots/${id}`)
  }

  async createRobotType(data: TypeCreateInput): Promise<RobotTypeResponse> {
    const res = await api.post<ApiResponse<RobotTypeResponse>>(
      "/robots/types",
      data,
    )
    return res.data.data
  }

  async updateRobotType(data: TypeUpdateInput): Promise<RobotTypeResponse> {
    const res = await api.put<ApiResponse<RobotTypeResponse>>(
      `/robots/types/${data.id}`,
      {
        name: data.name,
      },
    )
    return res.data.data
  }

  async deleteRobotType(id: number): Promise<void> {
    await api.delete(`/robots/types/${id}`)
  }
}

export const robotService = RobotService.getInstance()
