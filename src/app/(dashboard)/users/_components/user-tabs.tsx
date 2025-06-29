"use client"
import { Plus, Users } from "lucide-react"
import { useState } from "react"
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
import { userFilterConfig } from "@/config/user-filter"
import { useGenericFiltering } from "@/hooks/use-generic-filtering"
import { useGenericPagination } from "@/hooks/use-generic-pagination"
import { useGenericUrlState } from "@/hooks/use-generic-url-state"
import { useAllUsers, useDeleteUser } from "@/hooks/use-user-queries"
import type { User, UserUrlState } from "@/types/user"
import UserDataTable from "./user-data-table"
import UserFormDialog from "./user-form-dialog"

export default function UserTab() {
  const { filters, updateFilters, resetFilters } =
    useGenericUrlState<UserUrlState>({
      search: "",
      role: "all",
      active: "all",
      page: 1,
      limit: 8,
    })

  const { data: userResponse, isLoading, error, isError } = useAllUsers()
  const deleteUserMutation = useDeleteUser()

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const allUsers = (userResponse as any)?.data || []
  const filteredUsers = useGenericFiltering(allUsers, filters, userFilterConfig)
  const { data: paginatedUsers, meta } = useGenericPagination(
    filteredUsers,
    filters.page || 1,
    filters.limit || 8,
  )

  const handleAddUser = () => {
    setEditingUser(null)
    setIsFormDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsFormDialogOpen(true)
  }

  const handleDeleteRequest = (user: User) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return

    try {
      await deleteUserMutation.mutateAsync(userToDelete.id)
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    } catch (_error) {}
  }

  return (
    <>
      <Card className="border-slate-700/50 bg-slate-800/50 shadow-2xl backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Users</CardTitle>
              <CardDescription className="text-slate-400">
                Total: {allUsers.length} users (
                {allUsers.filter((u: User) => u.active).length} active)
              </CardDescription>
            </div>
            <Button
              onClick={handleAddUser}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Plus size={16} className="mr-2" />
              Add User
            </Button>
          </div>

          <GenericFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onReset={resetFilters}
            config={userFilterConfig}
            className="mt-4"
          />
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-cyan-500 border-b-2"></div>
              <p className="text-slate-400">Loading users...</p>
            </div>
          ) : isError ? (
            <div className="py-12 text-center">
              <Users size={48} className="mx-auto mb-4 text-red-400" />
              <p className="text-lg text-red-400">Error loading users</p>
              <p className="text-slate-500 text-sm">
                {error?.message || "Something went wrong"}
              </p>
            </div>
          ) : (
            <>
              <UserDataTable
                users={paginatedUsers}
                onEdit={handleEditUser}
                onDelete={handleDeleteRequest}
                filteredCount={filteredUsers.length}
                totalCount={allUsers.length}
              />

              {meta.totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={meta.page}
                    totalPages={meta.totalPages}
                    onPageChange={(page) => updateFilters({ page })}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <UserFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        editingUser={editingUser}
      />

      <DeleteAlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
        isLoading={deleteUserMutation.isPending}
      />
    </>
  )
}
