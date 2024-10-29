import React, { useState, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'
import { FormItem, FormLabel } from './ui/form'

type SalaryRangeFieldProps = {
  currency: string
  required?: boolean
}

export const SalaryRangeField: React.FC<SalaryRangeFieldProps> = ({
  currency,
  required = true,
}) => {
  const { watch, setValue } = useFormContext()
  const minSalary = watch('minSalary') || 0
  const maxSalary = watch('maxSalary') || 0
  const isSingleValue = watch('isSingleValue')
  const salaryFrequency = watch('salaryFrequency')

  const minSalaryRef = useRef<HTMLInputElement | null>(null)
  const maxSalaryRef = useRef<HTMLInputElement | null>(null)

  const [isFocusedMin, setIsFocusedMin] = useState(false)
  const [isFocusedMax, setIsFocusedMax] = useState(false)

  const handleFocus = (type: 'min' | 'max') => {
    if (type === 'min') {
      setIsFocusedMin(true)
    } else {
      setIsFocusedMax(true)
    }
  }

  const handleBlur = (type: 'min' | 'max') => {
    if (type === 'min') {
      setIsFocusedMin(false)
    } else {
      setIsFocusedMax(false)
    }
  }

  const getCurrencyPosition = (value: string): 'start' | 'end' => {
    if (value.match(/^[R$\u20AC$]/)) {
      return 'start'
    }
    return 'end'
  }

  const updateCursorPosition = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      const inputValue = ref.current.value
      const currencyPosition = getCurrencyPosition(inputValue)

      if (currencyPosition === 'start') {
        const currencyAndSpace = inputValue.match(/^[R$\u20AC$]\s*/)?.[0] || ''
        const numberStartIndex = currencyAndSpace.length

        const lastNumberMatch = inputValue.match(/\d(?=[^0-9]*$)/)
        if (lastNumberMatch) {
          const lastNumberIndex = inputValue.lastIndexOf(lastNumberMatch[0])
          ref.current.setSelectionRange(
            lastNumberIndex + 1,
            lastNumberIndex + 1
          )
        } else {
          ref.current.setSelectionRange(numberStartIndex, numberStartIndex)
        }
      } else {
        const currencyMatch = inputValue.match(/[€]$/)
        if (currencyMatch) {
          const currencyIndex = inputValue.lastIndexOf(currencyMatch[0])
          ref.current.setSelectionRange(currencyIndex - 1, currencyIndex - 1)
        }
      }
    }
  }

  const handleInputChange = (inputValue: string, type: 'min' | 'max') => {
    const numericValue = inputValue.replace(/[^0-9]/g, '')
    const value = numericValue
      ? Math.max(0, Math.min(100000, Number(numericValue)))
      : 0

    if (type === 'min') {
      setValue('minSalary', value)
      if (isSingleValue) {
        setValue('maxSalary', value)
      } else if (value > maxSalary) {
        setValue('maxSalary', value)
      }
    } else {
      setValue('maxSalary', value)
      if (isSingleValue) {
        setValue('minSalary', value)
      }
    }

    setTimeout(() => {
      updateCursorPosition(type === 'min' ? minSalaryRef : maxSalaryRef)
    }, 0)
  }

  const formatSalary = (value: number) => {
    const currencyFormats = {
      USD: { locale: 'en-US', currency: 'USD' },
      EUR: { locale: 'de-DE', currency: 'EUR' },
      BRL: { locale: 'pt-BR', currency: 'BRL' },
    }

    const format = currencyFormats[currency] || currencyFormats.BRL

    return new Intl.NumberFormat(format.locale, {
      style: 'currency',
      currency: format.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.focus()
      updateCursorPosition(ref)
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    if (ref.current) {
      const inputValue = ref.current.value
      const currencyPosition = getCurrencyPosition(inputValue)
      const cursorPosition = ref.current.selectionStart || 0

      if (currencyPosition === 'start') {
        const currencyAndSpace = inputValue.match(/^[R$\u20AC$]\s*/)?.[0] || ''
        if (
          e.key === 'Backspace' &&
          cursorPosition <= currencyAndSpace.length
        ) {
          e.preventDefault()
        }
      } else {
        const currencyMatch = inputValue.match(/[€]$/)
        if (
          currencyMatch &&
          e.key === 'Backspace' &&
          cursorPosition > inputValue.lastIndexOf(currencyMatch[0])
        ) {
          e.preventDefault()
        }
      }
    }
  }

  const handleSingleValueChange = (checked: boolean) => {
    setValue('isSingleValue', checked)
    if (checked) {
      setValue('maxSalary', minSalary)
    }
  }

  const handleRangeChange = (values: number[]) => {
    if (!Array.isArray(values) || values.length !== 2) return

    if (isSingleValue) {
      const value = Math.floor(values[1])
      setValue('minSalary', value)
      setValue('maxSalary', value)
    } else {
      setValue('minSalary', Math.floor(values[0]))
      setValue('maxSalary', Math.floor(values[1]))
    }
  }

  return (
    <FormItem className="w-full space-y-2">
      <FormLabel>
        Salário {required && <span className="text-red-600">*</span>}
      </FormLabel>
      <div className="flex gap-6">
        {/* Coluna da esquerda - Inputs de salário */}
        <div className="flex w-1/2 flex-col space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="minSalary" className="mb-1 text-sm text-gray-500">
                De
              </Label>
              <div className="relative">
                <Input
                  id="minSalary"
                  type="text"
                  inputMode="numeric"
                  value={formatSalary(minSalary)}
                  onChange={(e) => handleInputChange(e.target.value, 'min')}
                  onKeyDown={(e) => handleKeyDown(e, minSalaryRef)}
                  className="w-full pr-8"
                  onClick={() => handleClick(minSalaryRef)}
                  onFocus={() => handleFocus('min')}
                  onBlur={() => handleBlur('min')}
                  ref={minSalaryRef}
                />
                {isFocusedMin && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500">
                    {currency}
                  </span>
                )}
              </div>
            </div>
            {!isSingleValue && (
              <div className="flex-1">
                <Label
                  htmlFor="maxSalary"
                  className="mb-1 text-sm text-gray-500"
                >
                  Até
                </Label>
                <div className="relative">
                  <Input
                    id="maxSalary"
                    type="text"
                    inputMode="numeric"
                    value={formatSalary(maxSalary)}
                    onChange={(e) => handleInputChange(e.target.value, 'max')}
                    onKeyDown={(e) => handleKeyDown(e, maxSalaryRef)}
                    className="w-full pr-8"
                    onClick={() => handleClick(maxSalaryRef)}
                    onFocus={() => handleFocus('max')}
                    onBlur={() => handleBlur('max')}
                    ref={maxSalaryRef}
                  />
                  {isFocusedMax && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500">
                      {currency}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative w-full pb-6 pt-2">
            <RangeSlider
              min={0}
              max={100000}
              step={100}
              value={isSingleValue ? [0, minSalary] : [minSalary, maxSalary]}
              onInput={handleRangeChange}
              className={`
                [&_.range-slider]:h-1 [&_.range-slider]:bg-gray-200 
                [&_.range-slider__range]:bg-blue-500
                [&_.range-slider__thumb:hover]:bg-gray-50 [&_.range-slider__thumb]:h-4
                [&_.range-slider__thumb]:w-4 [&_.range-slider__thumb]:cursor-pointer
                [&_.range-slider__thumb]:rounded-full [&_.range-slider__thumb]:border-2
                [&_.range-slider__thumb]:border-blue-500 [&_.range-slider__thumb]:bg-white
                ${
                  isSingleValue
                    ? '[&_.range-slider__range]:hidden [&_.range-slider__thumb:first-child]:hidden'
                    : ''
                }
              `}
            />
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
        </div>

        {/* Coluna da direita - Frequência salarial */}
        <div className="flex w-1/2 flex-col">
          <Label className="mb-1 text-sm text-gray-500">Frequência</Label>
          <Select
            value={salaryFrequency}
            onValueChange={(value) =>
              setValue('salaryFrequency', value as 'monthly' | 'annual')
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a frequência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="annual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </FormItem>
  )
}
