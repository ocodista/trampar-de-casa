'use client'
import { ProfileSchemaEnum } from 'app/subscriber/profile/profileSchema'
import { format } from 'date-fns'
import React, { useEffect } from 'react'
import {
  ControllerRenderProps,
  FieldValues,
  Path,
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

interface CustomFormFieldProps<FormState> {
  name: string
  label: string
  placeholder?: string
  description?: string
  Input?: React.FC<{
    register
    name: string
    placeholder: string
    field: ControllerRenderProps<FieldValues, Path<FormState>>
    isSubmitting: boolean
  }>
  className?: string
}

export function CustomFormField<FormState>({
  name,
  label,
  placeholder,
  description,
  Input,
  className,
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
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            {Input({ register, name, placeholder, field, isSubmitting })}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const TextInput = ({ field, placeholder, isSubmitting }) => {
  return (
    <BaseInput
      type="string"
      disabled={isSubmitting}
      onFocus={(e) => {
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

export const StartWorkAtInput = ({ field, placeholder, isSubmitting }) => {
  const form = useFormContext()
  const extractMonth = (dateString: string) => {
    const [year, month] = format(new Date(dateString), 'yyyy-MM').split('-')
    const sanitizedMonth = String(Number(month)).padStart(2, '0')
    const sanitizedDate = `${year}-${sanitizedMonth}`
    return sanitizedDate
  }
  useEffect(() => {
    form.setValue(ProfileSchemaEnum.StartedWorkingAt, extractMonth(field.value))
  }, [])

  const fieldProps = {
    defaultValue: form.watch(ProfileSchemaEnum.StartedWorkingAt),
    onChange: (event: { target: HTMLInputElement }) => {
      form.setValue(
        ProfileSchemaEnum.StartedWorkingAt,
        event.target.valueAsDate
      )
    },
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
