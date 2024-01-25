'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, formSchema } from 'app/(roles)/formSchema'
import { CustomFormField, TextInput } from 'app/components/CustomFormField'
import { FormRadioGroup } from 'app/components/FormRadioGroup'
import { Button } from 'app/components/ui/button'
import { FormMessage } from 'app/components/ui/form'
import { useToast } from 'app/hooks/use-toast'
import { SkillsField } from 'app/subscribers/profile/components/SkillsField'
import { InputHTMLAttributes, useId } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Topics } from 'shared/src/enums/topics'
import { RolePreview } from './RolePreview'

type FormFields = {
  name: keyof FormSchema
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
    name: 'salary',
    label: 'Sálario',
    description: 'Digite o sálario base da vaga',
    placeholder: 'Ex: 3000',
    type: 'number',
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
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const toast = useToast()
  const onSubmit = async (data: FormSchema) => {
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')

    const response = await fetch('/api/vagas/publique', {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    if (response.ok) {
      form.reset()
      toast.toast({
        title: 'Vaga enviada com sucesso!',
        description: 'Muito obrigado por enviar a vaga.',
      })
      return
    }
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="container pb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Publique sua vaga!
          </h1>
          <section className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
            {fields.map((props) => (
              <CustomFormField key={props.name} {...props} Input={TextInput} />
            ))}
            <RoleTopic />
            <SkillsField />
          </section>
          <section className="space-x-4">
            <Button type="submit">Enviar</Button>
            <RolePreview />
          </section>
        </section>
      </form>
    </FormProvider>
  )
}

const RoleTopic = () => {
  const { setValue, watch, formState } = useFormContext<FormSchema>()
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
