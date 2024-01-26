'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, formSchema } from 'app/(roles)/formSchema'
import {
  CurrencySelect,
  CustomFormField,
  FormInputProps,
  LanguageSelect,
  TextInput,
} from 'app/components/CustomFormField'
import { Button } from 'app/components/ui/button'
import { useToast } from 'app/hooks/use-toast'
import { SkillsField } from 'app/subscribers/profile/components/SkillsField'
import { InputHTMLAttributes } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RolePreviewModal } from './RolePreview'
import { RolePreviewSection } from './RolePreviewSection'
import { RoleTopic } from './RoleTopic'

type FormFields = {
  name: keyof FormSchema
  label: string
  placeholder?: string
  description?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  Input?: React.FC<FormInputProps>
}[]

const fields: FormFields = [
  {
    name: 'url',
    type: 'url',
    label: 'Link da vaga',
    description: 'Insira o link da vaga',
  },
  {
    name: 'title',
    label: 'Título da vaga',
    description: 'Insira o título da vaga',
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
    name: 'description',
    label: 'Mensagem',
    description: 'Insira um resumo da vaga',
    placeholder: 'Ex: Mínimo X anos de XP (a partir de $xx.xxx)',
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
          <section>
            <RolePreviewSection />
            <section className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
              {fields.map((props) => (
                <CustomFormField
                  key={props.name}
                  {...props}
                  Input={props.Input || TextInput}
                />
              ))}
              <section className="grid grid-cols-2 gap-6">
                {[
                  {
                    name: 'currency',
                    label: 'Câmbio',
                    placeholder: 'BRL, USD, EUR...',
                    description: 'Insira o câmbio do salário',
                    Input: CurrencySelect,
                  },
                  {
                    name: 'salary',
                    label: 'Sálario',
                    description: 'Digite o sálario base da vaga',
                    placeholder: 'Ex: 3000',
                    type: 'number',
                  },
                ].map((props) => (
                  <CustomFormField
                    key={props.name}
                    {...props}
                    Input={props.Input || TextInput}
                  />
                ))}
              </section>
              <section className="grid grid-cols-2 gap-6">
                {[
                  {
                    name: 'country',
                    label: 'País',
                    description: 'Insira o país no qual a empresa se econtra',
                  },
                  {
                    name: 'language',
                    label: 'Lingua da vaga',
                    description: 'Selecione uma lingua',
                    placeholder: 'Lingua',
                    Input: LanguageSelect,
                  },
                ].map((props) => (
                  <CustomFormField
                    key={props.name}
                    {...props}
                    Input={props.Input || TextInput}
                  />
                ))}
              </section>
              <RoleTopic />
              <SkillsField />
            </section>
          </section>
          <section className="flex gap-4">
            <Button type="submit">Enviar</Button>
            <section className="md:invisible">
              <RolePreviewModal />
            </section>
          </section>
        </section>
      </form>
    </FormProvider>
  )
}
