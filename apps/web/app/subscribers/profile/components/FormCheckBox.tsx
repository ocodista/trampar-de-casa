'use client'
import { ReactNode, useEffect, useState } from 'react'
import { Checkbox } from '../../../components/ui/checkbox'

type FormCheckBoxProps = {
  id: string
  title: ReactNode
  onChange?: (isChecked: boolean) => void
  isChecked?: boolean
  disabled?: boolean
}

export const FormCheckBox = ({
  id,
  title,
  onChange,
  isChecked: isCheckedProp,
  disabled,
}: FormCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(isCheckedProp)
  useEffect(() => {
    setIsChecked(isCheckedProp)
  }, [isCheckedProp])
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        disabled={disabled}
        checked={isChecked}
        onClick={() => {
          const newStateValue = !isChecked
          onChange(newStateValue)
          setIsChecked(newStateValue)
        }}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {title}
      </label>
    </div>
  )
}
