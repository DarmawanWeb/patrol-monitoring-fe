"use client"

import { Plus, Settings } from "lucide-react"
import { useState } from "react"
import DeleteAlertDialog from "@/components/modal/delete-alert-dialog"
import GenericDataTable from "@/components/shared/generic-data-table"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  useDeleteRobotType,
  useRobotTypes,
} from "@/hooks/queries/use-robots-queries"
import type { RobotTypeResponse } from "@/types/robot"
import TypeFormDialog from "./type-form-dialog"

export default function TypeTab() {
  const { data: robotTypes, isLoading } = useRobotTypes()
  const deleteTypeMutation = useDeleteRobotType()

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [editingType, setEditingType] = useState<RobotTypeResponse | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [typeToDelete, setTypeToDelete] = useState<RobotTypeResponse | null>(
    null,
  )

  const handleAddType = () => {
    setEditingType(null)
    setIsFormDialogOpen(true)
  }

  const handleEditType = (type: RobotTypeResponse) => {
    setEditingType(type)
    setIsFormDialogOpen(true)
  }

  const handleDeleteRequest = (type: RobotTypeResponse) => {
    setTypeToDelete(type)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!typeToDelete) return

    try {
      await deleteTypeMutation.mutateAsync(typeToDelete.id)
      setIsDeleteDialogOpen(false)
      setTypeToDelete(null)
    } catch (_error) {}
  }

  const typeColumns = [
    {
      key: "type",
      label: "Type",
      render: (type: RobotTypeResponse) => (
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-600/20">
            <Settings size={14} className="text-purple-400" />
          </div>
          <span className="font-medium text-white">{type.name}</span>
        </div>
      ),
    },
    {
      key: "robotCount",
      label: "Robots Using",
      render: (type: RobotTypeResponse) => (
        <span
          className={`inline-flex items-center rounded-md px-2 py-1 font-medium text-xs ${
            type.robotCount > 0
              ? "border border-green-500/30 bg-green-500/20 text-green-300"
              : "border border-gray-500/30 bg-gray-500/20 text-gray-300"
          }`}
        >
          {type.robotCount} robot{type.robotCount !== 1 ? "s" : ""}
        </span>
      ),
    },
  ]

  return (
    <>
      <Card className="border-slate-700/50 bg-slate-800/50 shadow-2xl backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Robot Types</CardTitle>
              <CardDescription className="text-slate-400">
                Manage robot type definitions and categories
              </CardDescription>
            </div>
            <Button
              onClick={handleAddType}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              <Plus size={16} className="mr-2" />
              Add Type
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <GenericDataTable
            data={robotTypes || []}
            columns={typeColumns}
            onEdit={handleEditType}
            onDelete={(type) =>
              type.robotCount === 0 ? handleDeleteRequest(type) : undefined
            }
            isLoading={isLoading}
            emptyMessage="No robot types found"
          />
        </CardContent>
      </Card>

      <TypeFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        editingType={editingType}
      />

      <DeleteAlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Robot Type"
        description={`Are you sure you want to delete "${typeToDelete?.name}"? This action cannot be undone.`}
        isLoading={deleteTypeMutation.isPending}
      />
    </>
  )
}
