"use client"

import { ArrowUpDown, Filter, RotateCcw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FilterConfig } from "@/types/filtering"

interface GenericFiltersProps<T> {
  filters: Record<string, any>
  onFiltersChange: (filters: Record<string, any>) => void
  onReset: () => void
  config: FilterConfig<T>
  className?: string
}

export default function GenericFilters<T>({
  filters,
  onFiltersChange,
  onReset,
  config,
  className = "",
}: GenericFiltersProps<T>) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ search: value, page: 1 })
  }

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ [key]: value, page: 1 })
  }

  const handleSortChange = (sortBy: string) => {
    const currentOrder = filters.sortOrder || "asc"
    const newOrder =
      filters.sortBy === sortBy && currentOrder === "asc" ? "desc" : "asc"
    onFiltersChange({ sortBy, sortOrder: newOrder, page: 1 })
  }

  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      <div className="relative flex-1">
        <Search
          size={16}
          className="-translate-y-1/2 absolute top-1/2 left-3 transform text-slate-400"
        />
        <Input
          placeholder="Search..."
          value={filters.search || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="border-slate-600/50 bg-slate-700/50 pl-10 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50"
        />
      </div>

      {Object.entries(config.filterFields).map(([key, fieldConfig]) => (
        <Select
          key={key}
          value={filters[key] || "all"}
          onValueChange={(value) => handleFilterChange(key, value)}
        >
          <SelectTrigger className="w-40 border-slate-600/50 bg-slate-700/50 text-white">
            <Filter size={16} className="mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-slate-700/50 bg-slate-800 text-white">
            <SelectItem value="all">
              All {(fieldConfig as any).label}
            </SelectItem>
            {(fieldConfig as any).options?.map((option: any) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      {/* Sort */}
      {config.sortFields && config.sortFields.length > 0 && (
        <Select value={filters.sortBy || ""} onValueChange={handleSortChange}>
          <SelectTrigger className="w-40 border-slate-600/50 bg-slate-700/50 text-white">
            <ArrowUpDown size={16} className="mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="border-slate-700/50 bg-slate-800 text-white">
            {config.sortFields.map((field) => (
              <SelectItem
                key={field.key.toString()}
                value={field.key.toString()}
              >
                {field.label}{" "}
                {filters.sortBy === field.key
                  ? filters.sortOrder === "desc"
                    ? "↓"
                    : "↑"
                  : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={onReset}
        className="border-slate-600 text-slate-300 hover:bg-slate-700"
      >
        <RotateCcw size={16} className="mr-2" />
        Reset
      </Button>
    </div>
  )
}
