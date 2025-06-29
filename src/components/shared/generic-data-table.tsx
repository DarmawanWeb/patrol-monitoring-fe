import { Edit, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface GenericDataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onView?: (item: T) => void
  isLoading?: boolean
  emptyMessage?: string
  deleteDisabled?: boolean
  actions?: boolean
}

export default function GenericDataTable<T extends { id: string | number }>({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
  emptyMessage = "No data found",
  actions = true,
}: GenericDataTableProps<T>) {
  const getValue = (item: T, key: keyof T | string): any => {
    if (typeof key === "string" && key.includes(".")) {
      return key.split(".").reduce((obj, prop) => obj?.[prop], item as any)
    }
    return item[key as keyof T]
  }

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-cyan-500 border-b-2"></div>
        <p className="text-slate-400">Loading...</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-slate-400">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-900/50">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
            {columns.map((column) => (
              <TableHead key={column.key.toString()} className="text-slate-300">
                {column.label}
              </TableHead>
            ))}
            {actions && (
              <TableHead className="text-right text-slate-300">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, _index) => (
            <TableRow
              key={item.id}
              className="border-slate-700/50 hover:bg-slate-800/30"
            >
              {columns.map((column) => (
                <TableCell
                  key={`${item.id}-${String(column.key)}`}
                  className="text-slate-300"
                >
                  {column.render
                    ? column.render(item)
                    : getValue(item, column.key)}
                </TableCell>
              ))}
              {actions && (
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(item)}
                        className="text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                      >
                        <Eye size={14} />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(item)}
                        className="text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
                      >
                        <Edit size={14} />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(item)}
                        className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
