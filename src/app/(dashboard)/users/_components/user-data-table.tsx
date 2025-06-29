"use client"

import GenericDataTable from "@/components/shared/generic-data-table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/user"

interface UserDataTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onToggleStatus: (user: User) => void
  isToggling: boolean
  filteredCount: number
  totalCount: number
}

export default function UserDataTable({
  users,
  onEdit,
  onDelete,
  onToggleStatus,
  isToggling,
  filteredCount,
  totalCount,
}: UserDataTableProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "operator":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "user":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const userColumns = [
    {
      key: "user",
      label: "User",
      render: (user: User) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 border border-slate-600">
            <AvatarFallback className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 text-sm">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-slate-400 text-xs">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user: User) => (
        <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (user: User) => (
        <Button
          onClick={() => onToggleStatus(user)}
          disabled={isToggling}
          className={`rounded-full px-3 py-1 font-medium text-xs transition-colors ${
            user.active
              ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
              : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
          } ${isToggling ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {user.active ? "Active" : "Inactive"}
        </Button>
      ),
    },
    {
      key: "id",
      label: "ID",
      render: (user: User) => (
        <span className="font-mono text-slate-400 text-sm">#{user.id}</span>
      ),
    },
  ]

  if (users.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-700/50">
          <span className="text-2xl">👥</span>
        </div>
        <p className="text-lg text-slate-400">
          {filteredCount === 0 && totalCount > 0
            ? "No users match your filters"
            : "No users found"}
        </p>
        <p className="mt-1 text-slate-500 text-sm">
          {filteredCount === 0 && totalCount > 0
            ? "Try adjusting your search or filters"
            : "Create your first user to get started"}
        </p>
      </div>
    )
  }

  return (
    <GenericDataTable
      data={users}
      columns={userColumns}
      onEdit={onEdit}
      onDelete={onDelete}
      isLoading={false}
      emptyMessage="No users found"
    />
  )
}
