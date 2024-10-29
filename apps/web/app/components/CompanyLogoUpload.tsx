import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const CompanyLogoUpload: React.FC = () => {
  const { register, setValue, watch } = useFormContext()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue('companyLogo', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = (e: React.MouseEvent) => {
    e.stopPropagation()
    setValue('companyLogo', null)
    setPreviewUrl(null)
  }

  const handleClick = () => {
    document.getElementById('companyLogo')?.click()
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {previewUrl ? (
        <div
          className="group relative h-32 w-32 cursor-pointer"
          onClick={handleClick}
        >
          <img
            src={previewUrl}
            alt="Logo preview"
            className="h-full w-full rounded-full object-cover transition-opacity group-hover:opacity-75"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <span className="rounded-full bg-black bg-opacity-50 px-2 py-1 text-sm text-white">
              Trocar Logo
            </span>
          </div>
          <Button
            type="button"
            onClick={handleRemoveLogo}
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
            size="icon"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="flex h-32 w-32 cursor-pointer flex-col items-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 transition-colors hover:border-gray-400 hover:bg-gray-50"
        >
          <div className="flex h-full flex-col items-center justify-center">
            <span className="text-center text-sm text-gray-500">
              Logo da empresa
            </span>
          </div>
        </div>
      )}

      <Input
        id="companyLogo"
        type="file"
        accept="image/*"
        className="hidden"
        {...register('companyLogo')}
        onChange={handleFileChange}
      />
    </div>
  )
}
