'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, formSchema } from 'app/(roles)/formSchema'
import {
  CustomFormField,
  FormInputProps,
  LanguageSelect,
  TextInput,
} from 'app/components/CustomFormField'
import { FormRadioGroup } from 'app/components/FormRadioGroup'
import { Button } from 'app/components/ui/button'
import { FormMessage } from 'app/components/ui/form'
import { useToast } from 'app/hooks/use-toast'
import { SkillsField } from 'app/subscribers/profile/components/SkillsField'
import { InputHTMLAttributes, useId, useRef } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Topics } from 'shared/src/enums/topics'
import { useIntersectionObserver } from 'usehooks-ts'
import { RolePreview, RolePreviewModal } from './RolePreview'

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
    name: 'description',
    label: 'Descrição',
    description: 'Insira a descrição da vaga',
  },
]

const RolePreviewSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const entry = useIntersectionObserver(sectionRef, {
    threshold: 0.3,
  })
  const isFloatSectionVisible = !entry?.isIntersecting

  return (
    <>
      {isFloatSectionVisible && (
        <section className="fixed bottom-4 right-4 z-50 hidden w-[500px] rounded-md border border-solid border-gray-300 bg-white p-4 pt-6 shadow md:block">
          <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
            Pré visualização
          </h2>
          <section className="m-x-auto max-w-[425px]">
            <RolePreview />
          </section>
        </section>
      )}
      <section ref={sectionRef} className="hidden bg-white pt-6 md:block">
        <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
          Pré visualização
        </h2>
        <section className="max-w-[425px]">
          <RolePreview />
        </section>
      </section>
    </>
  )
}

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
            <section className="grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2">
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
                    description: 'Insira o câmbio do salário',
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
                    Input={TextInput}
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
              <SkillsField />
              <RoleTopic />
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
