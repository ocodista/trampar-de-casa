'use client'
import { ProfileSchemaEnum } from 'app/subscribers/profile/profileSchema'
import { format } from 'date-fns'
import { Database } from 'db/src/supabase/type'
import React, { InputHTMLAttributes, useEffect } from 'react'
import {
  Controller,
  ControllerRenderProps,
  FieldValue,
  Path,
  UseFormRegister,
  useFormContext,
} from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from './ui/form'
import { Input as BaseInput } from './ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface CustomFormFieldProps<FormState> {
  name: string
  label: string
  placeholder?: string
  description?: string
  Input?: React.FC<FormInputProps>
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  className?: string
  required?: boolean
}

export function CustomFormField<FormState>({
  name,
  label,
  placeholder,
  description,
  Input,
  className,
  type,
  required,
}: CustomFormFieldProps<FormState>) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  const hasError = errors[name as string]
  const errorMessage = hasError
    ? (errors[name as string]?.message as string)
    : ''

  return (
    <FormField
      control={control}
      name={name as Path<FormState>}
      render={({ field }: { field: ControllerRenderProps }) => (
        <FormItem className={`${className} relative flex flex-col justify-end`}>
          <FormLabel className={hasError ? 'text-red-500' : ''}>
            {label} {required && <span className="text-red-600">*</span>}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            {Input({
              register,
              name,
              placeholder,
              field,
              isSubmitting: false,
              type,
            })}
          </FormControl>
          <div className="mt-1 h-6 text-sm text-red-500">{errorMessage}</div>
        </FormItem>
      )}
    />
  )
}

export type FormInputProps = {
  field: ControllerRenderProps
  placeholder: string
  isSubmitting: boolean
  name: string
  register: UseFormRegister<FieldValue<any>>
  type: InputHTMLAttributes<HTMLInputElement>['type']
}

export const TextInput = ({
  field,
  placeholder,
  isSubmitting,
  type = 'text',
  name,
}: FormInputProps) => {
  const { watch, setValue } = useFormContext()
  const value = watch(name)

  return (
    <BaseInput
      type={type}
      min={0}
      disabled={isSubmitting}
      onFocus={(e) => {
        if (type === 'number') return
        const goToLastCharacter = () => {
          e.target.selectionStart = e.target.value.length
        }
        goToLastCharacter()
      }}
      value={value || ''}
      onChange={(e) => {
        setValue(name, e.target.value)
        field.onChange(e)
      }}
      placeholder={placeholder || ''}
    />
  )
}

export const LanguageSelect = ({ placeholder, name }: FormInputProps) => {
  const { control } = useFormContext()

  const languages: {
    value: Database['public']['Enums']['RoleLanguage']
    label: string
  }[] = [
    {
      value: 'Portuguese',
      label: 'Português',
    },
    {
      value: 'English',
      label: 'Inglês',
    },
  ]
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          value={field.value}
          defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Linguagem</SelectLabel>
              {languages.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  )
}
export const CurrencySelect = ({ placeholder, name }: FormInputProps) => {
  const { control } = useFormContext()

  const languages: {
    value: string
    label: string
  }[] = [
    {
      value: 'BRL',
      label: 'BRL',
    },
    {
      value: 'USD',
      label: 'USD',
    },
    {
      value: 'EUR',
      label: 'EUR',
    },
  ]
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          value={field.value}
          defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Câmbio</SelectLabel>
              {languages.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  )
}

export const EnglishLevelSelect = ({
  name,
  placeholder,
}: {
  name: string
  placeholder: string
}) => {
  const { control } = useFormContext()

  const languages = [
    { value: 'Beginner', label: 'Iniciante' },
    { value: 'Intermediary', label: 'Intermediário' },
    { value: 'Advanced', label: 'Avançado' },
    { value: 'Fluent', label: 'Fluente' },
  ]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          value={field.value}
          defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Nível de inglês</SelectLabel>
              {languages.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  )
}

export const StartWorkAtInput = ({ field, placeholder, isSubmitting }) => {
  const form = useFormContext()
  const dateToMonth = (dateString: string) => {
    const [year, month] = format(new Date(dateString), 'yyyy-MM').split('-')
    const sanitizedMonth = String(Number(month)).padStart(2, '0')
    const sanitizedDate = `${year}-${sanitizedMonth}`
    return sanitizedDate
  }
  useEffect(() => {
    if (field.value) {
      form.setValue(
        ProfileSchemaEnum.StartedWorkingAt,
        dateToMonth(field.value)
      )
    }
  }, [])

  const fieldProps = {
    defaultValue: form.watch(ProfileSchemaEnum.StartedWorkingAt),
    onChange: (event: { target: HTMLInputElement }) => {
      form.setValue(
        ProfileSchemaEnum.StartedWorkingAt,
        event.target.valueAsDate
      )
    },
    max: dateToMonth(new Date().toString()),
  }
  return (
    <BaseInput
      type="month"
      lang="pt-BR"
      disabled={isSubmitting}
      {...fieldProps}
      placeholder={placeholder || ''}
    />
  )
}

export const NumberInput = ({
  register,
  name,
  placeholder,
  field,
  isSubmitting,
}) => {
  return (
    <BaseInput
      type="number"
      placeholder={placeholder || ''}
      disabled={isSubmitting}
      {...(field as ControllerRenderProps)}
      {...register(name, { valueAsNumber: true })}
    />
  )
}
