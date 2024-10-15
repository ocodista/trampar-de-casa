import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { X } from 'lucide-react'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const CompanyLogoUpload: React.FC = () => {
  const { register, setValue, watch } = useFormContext()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const logoFile = watch('companyLogo')

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

  const handleRemoveLogo = () => {
    setValue('companyLogo', null)
    setPreviewUrl(null)
  }

  return (
    <div className="space-y-2">
      <Label
        htmlFor="companyLogo"
        className="block text-sm font-medium text-gray-700"
      >
        Logo da Empresa
      </Label>
      <div className="flex items-center space-x-4">
        {previewUrl ? (
          <div className="relative h-16 w-16">
            <img
              src={previewUrl}
              alt="Logo preview"
              className="h-16 w-16 rounded-full object-cover"
            />
            <Button
              type="button"
              onClick={handleRemoveLogo}
              className="absolute right-0 top-0 h-7 w-7 rounded-full bg-red-500 p-1 text-white"
              size="icon"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
            Logo
          </div>
        )}
        <div>
          <Input
            id="companyLogo"
            type="file"
            accept="image/*"
            className="hidden"
            {...register('companyLogo')}
            onChange={handleFileChange}
          />
          <Button
            type="button"
            onClick={() => document.getElementById('companyLogo')?.click()}
            className="bg-blue-500 text-white"
          >
            {logoFile ? 'Trocar Logo' : 'Adicionar Logo'}
          </Button>
        </div>
      </div>
    </div>
  )
}
