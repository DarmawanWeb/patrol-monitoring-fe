"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import ImageUpload from "@/components/shared/image-upload"
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
import { Textarea } from "@/components/ui/textarea"
import {
  useCreateRobot,
  useRobotTypes,
  useUpdateRobot,
} from "@/hooks/queries/use-robots-queries"
import { imgUrl } from "@/lib/env"
import type { Robot } from "@/types/robot"

const robotSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  typeId: z.number().min(1, "Please select a robot type"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

export type RobotFormValues = z.infer<typeof robotSchema>

const defaultFormValues: RobotFormValues = {
  name: "",
  typeId: 0,
  description: "",
}

export function useRobotForm(defaultValues?: Partial<RobotFormValues>) {
  return useForm<RobotFormValues>({
    resolver: zodResolver(robotSchema),
    defaultValues: {
      ...defaultFormValues,
      ...defaultValues,
    },
  })
}

interface RobotFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingRobot: Robot | null
}

export default function RobotFormDialog({
  isOpen,
  onClose,
  editingRobot,
}: RobotFormDialogProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const { data: robotTypes } = useRobotTypes()
  const createMutation = useCreateRobot()
  const updateMutation = useUpdateRobot()

  const form = useRobotForm()

  useEffect(() => {
    if (isOpen) {
      if (editingRobot) {
        form.reset({
          name: editingRobot.name,
          typeId: editingRobot.type.id,
          description: editingRobot.description,
        })
      } else {
        form.reset(defaultFormValues)
      }
      setImageFile(null)
    } else {
      form.reset(defaultFormValues)
      setImageFile(null)
    }
  }, [isOpen, editingRobot, form])

  const handleSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        imageFile: imageFile || undefined,
      }

      if (editingRobot) {
        await updateMutation.mutateAsync({
          ...payload,
          id: editingRobot.id,
        })
      } else {
        await createMutation.mutateAsync(payload)
      }

      onClose()
    } catch (_error) {}
  }

  const handleClose = () => {
    form.reset(defaultFormValues)
    setImageFile(null)
    onClose()
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border-slate-700/50 bg-slate-800/95 text-white backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>
            {editingRobot ? "Edit Robot" : "Add New Robot"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {editingRobot
              ? "Update robot information and settings"
              : "Create a new robot with specified configuration"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter robot name"
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
            <Label htmlFor="typeId" className="text-slate-300">
              Robot Type
            </Label>
            <Select
              value={form.watch("typeId")?.toString() || ""}
              onValueChange={(value) =>
                form.setValue("typeId", parseInt(value))
              }
            >
              <SelectTrigger className="w-full border-slate-600/50 bg-slate-700/50 text-white focus:border-cyan-500/50">
                <SelectValue placeholder="Select robot type" />
              </SelectTrigger>
              <SelectContent className="border-slate-700/50 bg-slate-800 text-white">
                {robotTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.typeId && (
              <Alert className="border-red-500/20 bg-red-500/10 py-2">
                <AlertDescription className="text-red-400 text-sm">
                  Please select a robot type
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter robot description"
              rows={3}
              className={`resize-none border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                form.formState.errors.description ? "border-red-500/50" : ""
              }`}
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <Alert className="border-red-500/20 bg-red-500/10 py-2">
                <AlertDescription className="text-red-400 text-sm">
                  {form.formState.errors.description.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <ImageUpload
            onImageChange={setImageFile}
            currentImage={
              editingRobot?.imagePath
                ? `${imgUrl}/${editingRobot.imagePath}`
                : undefined
            }
            imageFile={imageFile}
          />

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
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {editingRobot ? "Updating..." : "Creating..."}
                </div>
              ) : editingRobot ? (
                "Update Robot"
              ) : (
                "Create Robot"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
