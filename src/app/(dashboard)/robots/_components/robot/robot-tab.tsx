"use client"

import { Bot, Plus } from "lucide-react"
import { useMemo, useState } from "react"
import DeleteAlertDialog from "@/components/modal/delete-alert-dialog"
import GenericFilters from "@/components/shared/generic-filters"
import Pagination from "@/components/shared/pagination"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  robotFilterConfig,
  updateRobotTypeOptions,
} from "@/config/robot-filters"
import {
  useAllRobots,
  useDeleteRobot,
  useRobotTypes,
} from "@/hooks/queries/use-robots-queries"
import { useGenericFiltering } from "@/hooks/use-generic-filtering"
import { useGenericPagination } from "@/hooks/use-generic-pagination"
import { useGenericUrlState } from "@/hooks/use-generic-url-state"
import type { Robot, RobotUrlState } from "@/types/robot"
import RobotCard from "./robot-card"
import RobotFormDialog from "./robot-form-dialog"

export default function RobotTab() {
  const { filters, updateFilters, resetFilters } =
    useGenericUrlState<RobotUrlState>({
      tab: "robots",
      search: "",
      status: "all",
      typeId: "all",
      page: 1,
      limit: 6,
    })

  const { data: robotResponse, isLoading, error, isError } = useAllRobots()
  const { data: robotTypes } = useRobotTypes()
  const deleteRobotMutation = useDeleteRobot()

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [editingRobot, setEditingRobot] = useState<Robot | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [robotToDelete, setRobotToDelete] = useState<Robot | null>(null)

  const filterConfig = useMemo(() => {
    if (robotTypes) {
      return updateRobotTypeOptions(robotFilterConfig, robotTypes)
    }
    return robotFilterConfig
  }, [robotTypes])

  const allRobots = robotResponse?.data || []
  const filteredRobots = useGenericFiltering(allRobots, filters, filterConfig)
  const { data: paginatedRobots, meta } = useGenericPagination(
    filteredRobots,
    filters.page || 1,
    filters.limit || 6,
  )

  const handleAddRobot = () => {
    setEditingRobot(null)
    setIsFormDialogOpen(true)
  }

  const handleEditRobot = (robot: Robot) => {
    setEditingRobot(robot)
    setIsFormDialogOpen(true)
  }

  const handleDeleteRequest = (robot: Robot) => {
    setRobotToDelete(robot)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!robotToDelete) return

    try {
      await deleteRobotMutation.mutateAsync(robotToDelete.id)
      setIsDeleteDialogOpen(false)
      setRobotToDelete(null)
    } catch (_error) {}
  }

  return (
    <>
      <Card className="border-slate-700/50 bg-slate-800/50 shadow-2xl backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Robots</CardTitle>
              <CardDescription className="text-slate-400">
                Manage robot instances and their configurations
                {` (${filteredRobots.length} of ${allRobots.length} robots)`}
              </CardDescription>
            </div>
            <Button
              onClick={handleAddRobot}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Plus size={16} className="mr-2" />
              Add Robot
            </Button>
          </div>

          {/* Generic Filters */}
          <GenericFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onReset={resetFilters}
            config={filterConfig}
            className="mt-4"
          />
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-cyan-500 border-b-2"></div>
              <p className="text-slate-400">Loading robots...</p>
            </div>
          ) : isError ? (
            <div className="py-12 text-center">
              <Bot size={48} className="mx-auto mb-4 text-red-400" />
              <p className="text-lg text-red-400">Error loading robots</p>
              <p className="text-slate-500 text-sm">
                {error?.message || "Something went wrong"}
              </p>
            </div>
          ) : paginatedRobots.length === 0 ? (
            <div className="py-12 text-center">
              <Bot size={48} className="mx-auto mb-4 text-slate-400" />
              <p className="text-lg text-slate-400">
                {filteredRobots.length === 0 && allRobots.length > 0
                  ? "No robots match your filters"
                  : "No robots found"}
              </p>
              <p className="text-slate-500 text-sm">
                {filteredRobots.length === 0 && allRobots.length > 0
                  ? "Try adjusting your search or filters"
                  : "Create your first robot to get started"}
              </p>
            </div>
          ) : (
            <>
              {/* Robot Cards Grid */}
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedRobots.map((robot) => (
                  <RobotCard
                    key={robot.id}
                    robot={robot}
                    onEdit={() => handleEditRobot(robot)}
                    onDelete={() => handleDeleteRequest(robot)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {meta.totalPages > 1 && (
                <Pagination
                  currentPage={meta.page}
                  totalPages={meta.totalPages}
                  onPageChange={(page) => updateFilters({ page })}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      <RobotFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        editingRobot={editingRobot}
      />

      <DeleteAlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Robot"
        description={`Are you sure you want to delete "${robotToDelete?.name}"? This action cannot be undone.`}
        isLoading={deleteRobotMutation.isPending}
      />
    </>
  )
}
