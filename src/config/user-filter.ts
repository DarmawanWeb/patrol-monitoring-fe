import type { FilterConfig } from "@/types/filtering"
import type { User } from "@/types/user"

export const userFilterConfig: FilterConfig<User> = {
  searchFields: ["name", "email"],
  filterFields: {
    role: {
      type: "select",
      label: "Role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Operator", value: "operator" },
      ],
    },
    active: {
      type: "boolean",
      label: "Status",
      options: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },
  },
  sortFields: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ],
}
