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
import {
  useCreateRobotType,
  useUpdateRobotType,
} from "@/hooks/use-robots-queries"
import type { RobotTypeResponse } from "@/types/robot"

const typeSchema = z.object({
  name: z.string().min(2, "Type name must be at least 2 characters"),
})

export type TypeFormValues = z.infer<typeof typeSchema>

// Default form values
const defaultFormValues: TypeFormValues = {
  name: "",
}

export function useTypeForm(defaultValues?: Partial<TypeFormValues>) {
  return useForm<TypeFormValues>({
    resolver: zodResolver(typeSchema),
    defaultValues: {
      ...defaultFormValues,
      ...defaultValues,
    },
  })
}

interface TypeFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingType: RobotTypeResponse | null
}

export default function TypeFormDialog({
  isOpen,
  onClose,
  editingType,
}: TypeFormDialogProps) {
  const createMutation = useCreateRobotType()
  const updateMutation = useUpdateRobotType()

  const form = useTypeForm()

  useEffect(() => {
    if (isOpen) {
      if (editingType) {
        form.reset({
          name: editingType.name,
        })
      } else {
        form.reset(defaultFormValues)
      }
    } else {
      form.reset(defaultFormValues)
    }
  }, [isOpen, editingType, form])

  const handleSubmit = async (data: any) => {
    try {
      if (editingType) {
        await updateMutation.mutateAsync({
          ...data,
          id: editingType.id,
        })
      } else {
        await createMutation.mutateAsync(data)
      }

      onClose()
    } catch (_error) {}
  }

  const handleClose = () => {
    form.reset(defaultFormValues)
    onClose()
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="border-slate-700/50 bg-slate-800/95 text-white backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>
            {editingType ? "Edit Robot Type" : "Add New Robot Type"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {editingType
              ? "Update robot type information"
              : "Create a new robot type category"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Type Name
            </Label>
            <Input
              id="name"
              placeholder="Enter type name"
              className={`border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/50 ${
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {editingType ? "Updating..." : "Creating..."}
                </div>
              ) : editingType ? (
                "Update Type"
              ) : (
                "Create Type"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
