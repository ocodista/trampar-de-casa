'use server'
import { Button } from 'app/components/ui/button'
import { Input } from 'app/components/ui/input'
import { Label } from 'app/components/ui/label'
import { Textarea } from 'app/components/ui/textarea'
import { HTMLInputTypeAttribute } from 'react'
import { Fields } from './Fields'
import { SkillsField } from './SkillsField'
import { saveTestimonial } from './saveTestimonial'

type FieldProps = {
  field: Fields
  value?: string
  label: string
  fieldType?: HTMLInputTypeAttribute
  required?: boolean
}
const Field = ({
  field,
  value,
  label,
  fieldType = 'text',
  required,
}: FieldProps) => (
  <section className="space-y-1">
    <Label
      className={
        required ? "after:ml-0.5 after:text-red-500 after:content-['*']" : ''
      }
      htmlFor={field}
    >
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

export async function TestimonialForm({ email }: { email: string }) {
  return (
    <form
      action={saveTestimonial}
      className="mx-4 grid w-screen max-w-[95vw] space-y-3 md:max-w-[70vw] lg:w-[70vw] lg:space-y-6 xl:max-w-[900px]"
    >
      <section className="space-y-1">
        <Label htmlFor={Fields.Email}>Email</Label>
        <Input
          name={Fields.Email}
          id={Fields.Email}
          type="email"
          readOnly
          disabled
          value={email}
        />
      </section>
      <Field field={Fields.Company} label="Qual empresa?" />
      <Field field={Fields.Role} label="Qual cargo?" required />
      <SkillsField />
      <section className="space-y-1">
        <Label htmlFor={Fields.Testimonial}>Dê mais detalhes</Label>
        <Textarea required id={Fields.Testimonial} name={Fields.Testimonial} />
      </section>
      <Button className="justify-self-end">Enviar</Button>
    </form>
  )
}
