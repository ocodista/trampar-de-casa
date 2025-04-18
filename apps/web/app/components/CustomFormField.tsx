'use client'
import { ProfileSchemaEnum } from 'app/subscribers/profile/profileSchema'
import { format } from 'date-fns'
import { Database } from 'db/src/supabase/type'
import React, { InputHTMLAttributes, useEffect } from 'react'
import {
  ControllerRenderProps,
  FieldValue,
  FieldValues,
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
  FormMessage,
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
  Input?: React.FC<FormInputProps<FormState>>
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  className?: string
  required?: boolean
}

export function CustomFormField<FormState extends FieldValues>({
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
    formState: { isSubmitting },
  } = useFormContext<FormState>()
  return (
    <FormField
      control={control}
      name={name as Path<FormState>}
      render={({ field }: { field: ControllerRenderProps<FormState> }) => (
        <FormItem className={`${className} flex flex-col justify-end`}>
          <FormLabel>
            {label} {required && <span className="text-red-600">*</span>}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            {Input &&
              Input({ register, name, placeholder, field, isSubmitting, type })}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export type FormInputProps<FormState extends FieldValues> = {
  field: ControllerRenderProps<FormState>
  placeholder: string
  isSubmitting: boolean
  name: string
  register: UseFormRegister<FormState>
  type: InputHTMLAttributes<HTMLInputElement>['type']
}

export const TextInput = <FormState extends FieldValues>({
  field,
  placeholder,
  isSubmitting,
  type = 'text',
  name,
}: FormInputProps<FormState>) => {
  const { watch } = useFormContext()
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
      value={watch(name)}
      {...(field as ControllerRenderProps)}
      placeholder={placeholder || ''}
    />
  )
}

export const LanguageSelect = ({
  field,
  isSubmitting,
  placeholder,
  name,
}: FormInputProps<FieldValue<Record<string, unknown>>>) => {
  const { setValue } = useFormContext()
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
    <Select
      onValueChange={(value) => {
        setValue(name, value)
      }}
      disabled={isSubmitting}
      {...(field as ControllerRenderProps)}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Linguagem</SelectLabel>
          {languages.map(({ label, value }) => (
            <SelectItem value={value} key={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export const CurrencySelect = ({
  field,
  isSubmitting,
  placeholder,
  name,
}: FormInputProps<FieldValue<Record<string, unknown>>>) => {
  const { setValue } = useFormContext()
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
    <Select
      onValueChange={(value) => {
        setValue(name, value)
      }}
      disabled={isSubmitting}
      {...(field as ControllerRenderProps)}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Moeda</SelectLabel>
          {languages.map(({ label, value }) => (
            <SelectItem value={value} key={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
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

export const NumberInput = <FormState extends FieldValues>({
  register,
  name,
  placeholder,
  field,
  isSubmitting,
}: FormInputProps<FormState>) => {
  return (
    <BaseInput
      type="number"
      placeholder={placeholder || ''}
      disabled={isSubmitting}
      {...(field as ControllerRenderProps<FormState>)}
      {...register(name as Path<FormState>, { valueAsNumber: true })}
    />
  )
}
