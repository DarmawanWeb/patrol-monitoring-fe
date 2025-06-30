"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCreateUser, useUpdateUser } from "@/hooks/queries/use-user-queries"
import type { User } from "@/types/user"

// Zod Schemas
const userCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Please select a role"),
})

const userUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().optional().or(z.literal("")),
  role: z.string().min(1, "Please select a role"),
})

// Types
export type UserCreateFormValues = z.infer<typeof userCreateSchema>
export type UserUpdateFormValues = z.infer<typeof userUpdateSchema>

// Form hooks
function useUserCreateForm(defaultValues?: Partial<UserCreateFormValues>) {
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

function useUserUpdateForm(defaultValues?: Partial<UserUpdateFormValues>) {
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

// Props
interface UserFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingUser: User | null
}

// Component
export default function UserFormDialog({
  isOpen,
  onClose,
  editingUser,
}: UserFormDialogProps) {
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()

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
  const errors = form.formState.errors
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (editingUser) {
        updateForm.reset({
          name: editingUser.name,
          email: editingUser.email,
          password: "",
          role: editingUser.role,
        })
      } else {
        createForm.reset() // clear from previous edit
      }
      setShowPassword(false)
    }
  }, [isOpen, editingUser, createForm, updateForm])

  const handleSubmit = async (
    data: UserCreateFormValues | UserUpdateFormValues,
  ) => {
    try {
      if (editingUser) {
        const updateData = {
          id: editingUser.id,
          name: data.name,
          email: data.email,
          role: data.role,
          ...(data.password && data.password.trim() !== ""
            ? { password: data.password }
            : {}),
        }
        await updateMutation.mutateAsync(updateData)
      } else {
        await createMutation.mutateAsync(data as UserCreateFormValues)
      }

      form.reset()
      onClose()
    } catch (_error) {}
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
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter full name"
              className={`border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                errors.name ? "border-red-500/50" : ""
              }`}
              {...form.register("name")}
            />
            {errors.name && (
              <Alert className="border-red-500/20 bg-red-500/10 py-2">
                <AlertDescription className="text-red-400 text-sm">
                  {errors.name.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              className={`border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                errors.email ? "border-red-500/50" : ""
              }`}
              {...form.register("email")}
            />
            {errors.email && (
              <Alert className="border-red-500/20 bg-red-500/10 py-2">
                <AlertDescription className="text-red-400 text-sm">
                  {errors.email.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {!editingUser && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`border-slate-600/50 bg-slate-700/50 pr-10 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                    errors.password ? "border-red-500/50" : ""
                  }`}
                  {...form.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="-translate-y-1/2 absolute top-1/2 right-3 text-slate-400 hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <Alert className="border-red-500/20 bg-red-500/10 py-2">
                  <AlertDescription className="text-red-400 text-sm">
                    {errors.password.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-slate-300">
              Role
            </Label>
            <Select onValueChange={(value) => form.setValue("role", value)}>
              <SelectTrigger className="w-full border-slate-600/50 bg-slate-700/50 text-white focus:border-cyan-500/50">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="border-slate-700/50 bg-slate-800 text-white">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <Alert className="border-red-500/20 bg-red-500/10 py-2">
                <AlertDescription className="text-red-400 text-sm">
                  {errors.role.message}
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
