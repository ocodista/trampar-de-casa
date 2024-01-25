'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomFormField, TextInput } from 'app/components/CustomFormField'
import { FormRadioGroup } from 'app/components/FormRadioGroup'
import { Button } from 'app/components/ui/button'
import { FormMessage } from 'app/components/ui/form'
import { SkillsField } from 'app/subscribers/profile/components/SkillsField'
import { InputHTMLAttributes, useId } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Topics } from 'shared/src/enums/topics'
import z from 'zod'

const formSchema = z.object({
  url: z.string().url('URL inválida.'),
  title: z.string({ required_error: 'Título inválido' }),
  company: z.string({ required_error: 'Nome da empresa inválido' }),
  currency: z.string({ required_error: 'Câmbio inválido' }),
  description: z.string().nullable(),
  language: z.string({ required_error: 'Idioma inválido' }),
  skillsId: z.array(z.string(), {
    required_error: 'Adicione pelo menos uma habilidade.',
  }),
  country: z.string({ required_error: 'País de origem inválido' }),
  minimumYears: z.string({ required_error: 'Valor inválido' }).nullable(),
  topicsId: z
    .string({ invalid_type_error: 'Selecione algum tópico' })
    .default(Topics.NATIONAL_VACANCIES.toString()),
})

type FormFields = {
  name: keyof z.TypeOf<typeof formSchema>
  label: string
  placeholder?: string
  description?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
}[]

const fields: FormFields = [
  {
    name: 'url',
    label: 'Link da vaga',
    description: 'Insira o link da vaga',
  },
  {
    name: 'title',
    label: 'Nome da vaga',
    description: 'Insira o nome da vaga',
  },
  {
    name: 'company',
    label: 'Nome da empresa',
    description: 'Insira o nome da empresa',
  },
  {
    name: 'minimumYears',
    label: 'Tempo mínimo de experiência',
    description: 'Insira o tempo em anos',
    type: 'number',
  },
  {
    name: 'country',
    label: 'País',
    description: 'Insira o país no qual a empresa se econtra',
  },
  {
    name: 'currency',
    label: 'Câmbio',
    description: 'Insira o câmbio do salário',
  },
  {
    name: 'description',
    label: 'Descrição',
    description: 'Insira a descrição da vaga',
  },
  {
    name: 'language',
    label: 'Idioma',
    description: 'Qual a preferência de idiomas para esta vaga?',
  },
]

export default function RolesCreate() {
  const form = useForm<z.TypeOf<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <section className="container pb-6">
          <section className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
            {fields.map((props) => (
              <CustomFormField key={props.name} {...props} Input={TextInput} />
            ))}
            <RoleTopic />
            <SkillsField />
          </section>
          <Button type="submit">Enviar</Button>
        </section>
      </form>
    </FormProvider>
  )
}

const RoleTopic = () => {
  const { setValue, watch, formState } =
    useFormContext<z.TypeOf<typeof formSchema>>()
  const fieldId = 'topicsId'
  const id = useId()

  return (
    <section className="flex flex-col justify-center gap-4 space-x-2">
      <p>Esta é uma vaga: </p>
      <FormRadioGroup
        key={id}
        options={[
          {
            label: 'Internacional',
            value: Topics.INTERNATIONAL_VACANCIES.toString(),
          },
          {
            label: 'Nacional',
            value: Topics.NATIONAL_VACANCIES.toString(),
          },
        ]}
        formKey={id}
        selectedOption={
          watch(fieldId) === Topics.INTERNATIONAL_VACANCIES.toString()
            ? Topics.INTERNATIONAL_VACANCIES.toString()
            : Topics.NATIONAL_VACANCIES.toString()
        }
        setSelectedOption={(option) => {
          console.log(option)
          setValue(fieldId, option)
        }}
      />
      {formState.errors?.topicsId?.message && (
        <FormMessage>{formState.errors?.topicsId.message}</FormMessage>
      )}
    </section>
  )
}
