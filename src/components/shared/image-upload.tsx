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
    if (file) onImageChange(file)
  }

  const removeImage = () => {
    onImageChange(null)
    setPreview(null)
  }

  return (
    <div className="space-y-4">
      <Label className="font-medium text-slate-300 text-sm">Robot Image</Label>

      {preview || currentImage ? (
        <div className="relative w-fit">
          <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-slate-600 shadow-md">
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
            size="icon"
            onClick={removeImage}
            className="absolute top-[-8px] right-[-8px] z-10 h-6 w-6 rounded-full bg-red-600 text-white shadow hover:bg-red-700"
          >
            <X size={14} />
          </Button>
        </div>
      ) : (
        <div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-500 border-dashed bg-slate-700/40 px-4 py-3 text-slate-300 transition hover:bg-slate-600/60">
          <Upload size={18} />
          <span className="text-sm">Click to upload image</span>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {imageFile && (
        <p className="text-slate-400 text-sm">
          Selected: <span className="font-medium">{imageFile.name}</span>
        </p>
      )}
    </div>
  )
}
