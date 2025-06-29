import { useMemo } from "react"
import type { BaseEntity, FilterConfig } from "@/types/filtering"

export function useGenericFiltering<T extends BaseEntity>(
  data: T[],
  filters: Record<string, any>,
  config: FilterConfig<T>,
) {
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return []

    return data.filter((item) => {
      if (filters.search && filters.search.trim() !== "") {
        const searchTerm = filters.search.toLowerCase().trim()
        const searchMatches = config.searchFields.some((field) => {
          const value = item[field]
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchTerm)
          }
          if (typeof value === "number") {
            return value.toString().includes(searchTerm)
          }
          if (typeof value === "object" && value !== null) {
            return JSON.stringify(value).toLowerCase().includes(searchTerm)
          }
          return false
        })

        if (!searchMatches) return false
      }

      for (const [filterKey, filterConfig] of Object.entries(
        config.filterFields,
      )) {
        const filterValue = filters[filterKey]

        if (filterValue && filterValue !== "all" && filterValue !== "") {
          const itemValue = item[filterKey as keyof T]

          if (filterConfig.type === "select") {
            if (itemValue !== filterValue) return false
          }

          if (filterConfig.type === "multiselect") {
            if (
              Array.isArray(filterValue) &&
              !filterValue.includes(itemValue)
            ) {
              return false
            }
          }

          if (filterConfig.type === "boolean") {
            const boolValue = filterValue === "true"
            if (itemValue !== boolValue) return false
          }

          if (filterConfig.type === "date") {
          }
        }
      }

      return true
    })
  }, [data, filters, config])

  // Sorting
  const sortedData = useMemo(() => {
    if (!filters.sortBy) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[filters.sortBy as keyof T]
      const bValue = b[filters.sortBy as keyof T]

      let comparison = 0
      if (aValue < bValue) comparison = -1
      if (aValue > bValue) comparison = 1

      return filters.sortOrder === "desc" ? -comparison : comparison
    })
  }, [filteredData, filters.sortBy, filters.sortOrder])

  return sortedData
}
