'use client'
import { Checkbox } from '@radix-ui/react-checkbox'
import { useFormContext } from 'react-hook-form'

export const FormCheckBox = ({ id, title }) => {
  const { register } = useFormContext()
  return (
    <div className="flex items-center space-x-2">
      <Checkbox name={id} id={id} {...register(id)} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {title}
      </label>
    </div>
  )
}
