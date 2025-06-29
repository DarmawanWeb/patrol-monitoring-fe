import type { FilterConfig } from "@/types/filtering"
import type { Robot } from "@/types/robot"

export const robotFilterConfig: FilterConfig<Robot> = {
  searchFields: ["name", "description", "id"],
  filterFields: {
    status: {
      type: "select",
      label: "Status",
      options: [
        { label: "Idle", value: "idle" },
        { label: "Patrol", value: "patrol" },
        { label: "Charging", value: "charging" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    "type.id": {
      type: "select",
      label: "Type",
      options: [], // Will be populated dynamically
    },
  } as any,
  sortFields: [
    { key: "name", label: "Name" },
    { key: "createdAt", label: "Created Date" },
    { key: "updatedAt", label: "Updated Date" },
  ],
}

export const updateRobotTypeOptions = (
  config: FilterConfig<Robot>,
  types: Array<{ id: number; name: string }>,
) => {
  const typeField = (config.filterFields as any)["type.id"]
  if (typeField) {
    typeField.options = types.map((type) => ({
      label: type.name,
      value: type.id,
    }))
  }
  return config
}
