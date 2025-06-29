import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import type { UrlState } from "@/types/filtering"

export function useGenericUrlState<T extends UrlState>(
  defaultValues: Partial<T>,
) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getFilters = useCallback((): T => {
    const filters = { ...defaultValues } as T

    for (const [key, defaultValue] of Object.entries(defaultValues)) {
      const urlValue = searchParams.get(key)

      if (urlValue !== null) {
        if (typeof defaultValue === "number") {
          filters[key as keyof T] = parseInt(urlValue) as T[keyof T]
        } else if (typeof defaultValue === "boolean") {
          filters[key as keyof T] = (urlValue === "true") as T[keyof T]
        } else {
          filters[key as keyof T] = urlValue as T[keyof T]
        }
      }
    }

    return filters
  }, [searchParams, defaultValues])

  const updateFilters = useCallback(
    (newFilters: Partial<T>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(newFilters).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== "all"
        ) {
          params.set(key, value.toString())
        } else if (key !== "page" && key !== "tab") {
          params.delete(key)
        }
      })

      // Ensure required params exist
      if (newFilters.page !== undefined) {
        params.set("page", newFilters.page.toString())
      }
      if (newFilters.tab !== undefined) {
        params.set("tab", newFilters.tab.toString())
      }

      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const resetFilters = useCallback(() => {
    const resetParams = new URLSearchParams()
    if (defaultValues.tab) resetParams.set("tab", defaultValues.tab.toString())
    if (defaultValues.page)
      resetParams.set("page", defaultValues.page.toString())

    router.push(`?${resetParams.toString()}`, { scroll: false })
  }, [router, defaultValues])

  return {
    filters: getFilters(),
    updateFilters,
    resetFilters,
  }
}
