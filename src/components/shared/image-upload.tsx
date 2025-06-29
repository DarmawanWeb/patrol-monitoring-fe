"use client"

import { Upload, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
  onImageChange: (file: File | null) => void
  currentImage?: string
  imageFile: File | null
}

export default function ImageUpload({
  onImageChange,
  currentImage,
  imageFile,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [imageFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onImageChange(file)
  }

  const removeImage = () => {
    onImageChange(null)
    setPreview(null)
  }

  return (
    <div className="space-y-3">
      <Label className="text-slate-300">Robot Image</Label>

      {(preview || currentImage) && (
        <div className="relative">
          <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-slate-600">
            <Image
              src={preview || currentImage || ""}
              width={128}
              height={128}
              alt="Robot preview"
              className="h-full w-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeImage}
            className="-top-2 -right-2 absolute h-6 w-6 rounded-full bg-red-500 p-0 text-white hover:bg-red-600"
          >
            <X size={12} />
          </Button>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border-slate-600/50 bg-slate-700/50 text-white file:mr-4 file:rounded file:border-0 file:bg-slate-600 file:px-4 file:py-2 file:text-sm file:text-white"
        />
        <Upload size={16} className="text-slate-400" />
      </div>

      {imageFile && (
        <p className="text-slate-400 text-sm">Selected: {imageFile.name}</p>
      )}
    </div>
  )
}
