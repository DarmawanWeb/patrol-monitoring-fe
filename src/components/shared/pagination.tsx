import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className={
            currentPage === page
              ? "bg-cyan-600 hover:bg-cyan-700"
              : "border-slate-600 text-slate-300 hover:bg-slate-700"
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  )
}
