'use client'
import { ProfileSchemaEnum } from 'app/subscribers/profile/profileSchema'
import { format } from 'date-fns'
import { Database } from 'db/src/supabase/type'
import React, { InputHTMLAttributes, useEffect } from 'react'
import {
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
  Input?: React.FC<FormInputProps>
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  className?: string
}

export function CustomFormField<FormState>({
  name,
  label,
  placeholder,
  description,
  Input,
  className,
  type,
}: CustomFormFieldProps<FormState>) {
  const {
    control,
    register,
    formState: { isSubmitting },
  } = useFormContext()
  return (
    <FormField
      control={control}
      name={name as Path<FormState>}
      render={({ field }: { field: ControllerRenderProps }) => (
        <FormItem className={`${className} flex flex-col justify-end`}>
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            {Input({ register, name, placeholder, field, isSubmitting, type })}
          </FormControl>
          <FormMessage />
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
}: FormInputProps) => {
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
}: FormInputProps) => {
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
