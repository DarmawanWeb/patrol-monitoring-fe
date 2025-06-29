import { useMemo } from "react"
import type { PaginatedResult } from "@/types/filtering"

export function useGenericPagination<T>(
  data: T[],
  page: number,
  limit: number,
): PaginatedResult<T> {
  const paginatedData = useMemo(() => {
    if (!data || data.length === 0) return []

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return data.slice(startIndex, endIndex)
  }, [data, page, limit])

  const meta = useMemo(
    () => ({
      total: data?.length || 0,
      page,
      limit,
      totalPages: Math.ceil((data?.length || 0) / limit),
    }),
    [data?.length, page, limit],
  )

  return { data: paginatedData, meta }
}
