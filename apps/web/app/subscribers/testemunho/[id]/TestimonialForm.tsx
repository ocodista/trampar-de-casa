'use server'
import { Button } from 'app/components/ui/button'
import { Input } from 'app/components/ui/input'
import { Label } from 'app/components/ui/label'
import { Textarea } from 'app/components/ui/textarea'
import { Field } from './Field'
import { Fields } from './Fields'
import { SkillsField } from './SkillsField'
import { saveTestimonial } from './saveTestimonial'

const FORM_ID = 'testimonial_form'

export async function TestimonialForm({ email }: { email: string }) {
  const saveTestimonialWithEmail = saveTestimonial.bind(null, email)
  return (
    <form
      id={FORM_ID}
      action={saveTestimonialWithEmail}
      className="grid w-full space-y-3 lg:space-y-6"
    >
      <section className="space-y-1">
        <Label htmlFor={Fields.Email}>Email</Label>
        <Input
          name={Fields.Email}
          id={Fields.Email}
          type="email"
          readOnly
          value={email}
          disabled
        />
      </section>
      <Field field={Fields.Company} required label="Qual empresa?" />
      <Field field={Fields.Role} label="Qual cargo?" required />
      <SkillsField formId={FORM_ID} />
      <section className="space-y-1">
        <Label htmlFor={Fields.Testimonial}>Dê mais detalhes</Label>
        <Textarea id={Fields.Testimonial} name={Fields.Testimonial} />
      </section>
      <Button className="justify-self-end rounded-full px-6 transition-all">
        Enviar
      </Button>
    </form>
  )
}
