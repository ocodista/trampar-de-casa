import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'

type SalaryRangeFieldProps = {
  currency: string
}

export const SalaryRangeField: React.FC<SalaryRangeFieldProps> = ({
  currency,
}) => {
  const { register, watch, setValue } = useFormContext()
  const minSalary = watch('minSalary')
  const maxSalary = watch('maxSalary')
  const isSingleValue = watch('isSingleValue')
  const salaryFrequency = watch('salaryFrequency')

  useEffect(() => {
    if (isSingleValue) {
      setValue('maxSalary', minSalary)
    }
  }, [isSingleValue, minSalary, setValue])

  const formatSalary = (value: number) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    } else {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
    }
  }

  const handleSingleValueChange = (checked: boolean) => {
    setValue('isSingleValue', checked)
    if (checked) {
      setValue('maxSalary', minSalary)
    }
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex w-full space-x-2">
        <Input
          type="range"
          {...register('minSalary', { valueAsNumber: true })}
          min={10}
          max={100000}
          step={10}
          className="w-full"
        />
        {!isSingleValue && (
          <Input
            type="range"
            {...register('maxSalary', { valueAsNumber: true })}
            min={10}
            max={100000}
            step={10}
            className="w-full"
          />
        )}
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatSalary(minSalary || 0)}</span>
        {!isSingleValue && <span>{formatSalary(maxSalary || 0)}</span>}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isSingleValue"
          checked={isSingleValue}
          onCheckedChange={handleSingleValueChange}
        />
        <Label htmlFor="isSingleValue" className="text-sm">
          Valor único
        </Label>
      </div>
      <Select
        value={salaryFrequency}
        onValueChange={(value) =>
          setValue('salaryFrequency', value as 'monthly' | 'annual')
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione a frequência salarial" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="monthly">Mensal</SelectItem>
          <SelectItem value="annual">Anual</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
