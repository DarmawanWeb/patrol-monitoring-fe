"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateUser, useUpdateUser } from "@/hooks/use-user-queries"
import type { User } from "@/types/user"

const userCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Please select a role"),
})

const userUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
  role: z.string().min(1, "Please select a role"),
})

export type UserCreateFormValues = z.infer<typeof userCreateSchema>
export type UserUpdateFormValues = z.infer<typeof userUpdateSchema>

export function useUserCreateForm(
  defaultValues?: Partial<UserCreateFormValues>,
) {
  return useForm<UserCreateFormValues>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      ...defaultValues,
    },
  })
}

export function useUserUpdateForm(
  defaultValues?: Partial<UserUpdateFormValues>,
) {
  return useForm<UserUpdateFormValues>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      ...defaultValues,
    },
  })
}

interface UserFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingUser: User | null
}

export default function UserFormDialog({
  isOpen,
  onClose,
  editingUser,
}: UserFormDialogProps) {
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()

  // Use different forms for create vs update (different schemas)
  const createForm = useUserCreateForm()
  const updateForm = useUserUpdateForm(
    editingUser
      ? {
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
        }
      : undefined,
  )

  const form = editingUser ? updateForm : createForm

  useEffect(() => {
    if (isOpen && editingUser) {
      updateForm.reset({
        name: editingUser.name,
        email: editingUser.email,
        password: "", // Empty password for update
        role: editingUser.role,
      })
    } else if (isOpen && !editingUser) {
      createForm.reset()
    }
  }, [isOpen, editingUser, createForm, updateForm])

  const handleSubmit = async (data: any) => {
    try {
      if (editingUser) {
        // Only send password if it's not empty
        const updateData = {
          id: editingUser.id,
          name: data.name,
          email: data.email,
          role: data.role,
          ...(data.password &&
            data.password.trim() !== "" && { password: data.password }),
        }
        await updateMutation.mutateAsync(updateData)
      } else {
        await createMutation.mutateAsync(data)
      }

      onClose()
      form.reset()
    } catch (_error) {
      // Error handled by mutation
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-slate-700/50 bg-slate-800/95 text-white backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>
            {editingUser ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {editingUser
              ? "Update user information and permissions"
              : "Create a new user account with appropriate permissions"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter full name"
              className={`border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                form.formState.errors.name ? "border-red-500/50" : ""
              }`}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <Alert className="border-red-500/20 bg-red-500/10 py-2">
                <AlertDescription className="text-red-400 text-sm">
                  {form.formState.errors.name.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              className={`border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                form.formState.errors.email ? "border-red-500/50" : ""
              }`}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <Alert className="border-red-500/20 bg-red-500/10 py-2">
                <AlertDescription className="text-red-400 text-sm">
                  {form.formState.errors.email.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Password{" "}
              {editingUser && (
                <span className="text-slate-500 text-xs">
                  (leave empty to keep current)
                </span>
              )}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={
                editingUser
                  ? "Leave empty to keep current password"
                  : "Enter password"
              }
              className={`border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                form.formState.errors.password ? "border-red-500/50" : ""
              }`}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <Alert className="border-red-500/20 bg-red-500/10 py-2">
                <AlertDescription className="text-red-400 text-sm">
                  {form.formState.errors.password.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-slate-300">
              Role
            </Label>
            {/* <Select
              value={form.watch("role") || ""}
              onValueChange={(value) => form.setValue("role", value)}
            >
              <SelectTrigger className="border-slate-600/50 bg-slate-700/50 text-white focus:border-cyan-500/50">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="border-slate-700/50 bg-slate-800 text-white">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="operator">Operator</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select> */}
            {form.formState.errors.role && (
              <Alert className="border-red-500/20 bg-red-500/10 py-2">
                <AlertDescription className="text-red-400 text-sm">
                  {form.formState.errors.role.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {editingUser ? "Updating..." : "Creating..."}
                </div>
              ) : editingUser ? (
                "Update User"
              ) : (
                "Create User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
