import { Input } from 'app/components/ui/input'
import { Label } from 'app/components/ui/label'
import { HTMLInputTypeAttribute } from 'react'
import { Fields } from './Fields'

export const REQUIRED_LABEL_STYLE =
  "after:ml-0.5 after:text-red-500 after:content-['*']"

type FieldProps = {
  field: Fields
  value?: string
  label: string
  fieldType?: HTMLInputTypeAttribute
  required?: boolean
}
export const Field = ({
  field,
  value,
  label,
  fieldType = 'text',
  required,
}: FieldProps) => (
  <section className="space-y-1">
    <Label className={required ? REQUIRED_LABEL_STYLE : ''} htmlFor={field}>
      {label}
    </Label>
    <Input
      name={field}
      id={field}
      type={fieldType}
      value={value}
      required={required}
    />
  </section>
)
