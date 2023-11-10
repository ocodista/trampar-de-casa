'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/react-select'
import { Button } from 'app/components/ui/button'
import { LoadingOverlay } from 'app/components/ui/loadingOverlay'
import { useToast } from 'app/hooks/use-toast'
import { EnglishLevel } from 'global/EnglishLevel'
import { usePathname } from 'next/navigation'
import { useId } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { ApiRoutes } from 'shared/src/enums/apiRoutes'
import {
  ProfileSchema,
  ProfileSchemaEnum,
  profileFormSchema,
} from '../profileSchema'
import { SubscriptionForm } from '../subscription/SubscriptionForm'
import { FormCheckBox } from './FormCheckBox'
import { PersonalInfoForm } from './PersonalInfoForm'

const title = 'Perfil'
const description = 'Configure seu perfil para receber vagas mais assertivas.'

export function SubscriberForm({
  profileInfos,
  descriptionTopics,
}: {
  profileInfos: ProfileSchema
  descriptionTopics: { name: string; id: number }[]
}) {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...profileInfos,
      englishLevel: profileInfos.englishLevel || EnglishLevel.None,
      linkedInUrl: profileInfos.linkedInUrl || 'https://linkedin.com/in/',
    },
    mode: 'onBlur',
    criteriaMode: 'firstError',
  })
  const paths = usePathname().split('/').reverse()
  const id = paths[0]
  const { toast } = useToast()

  const onSubmit = async (formState: ProfileSchema) => {
    try {
      const response = await fetch(ApiRoutes.Subscribers + '/' + id, {
        method: 'PUT',
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
      toast({ title: 'Atualizado com sucesso!' })
    } catch (err) {
      toast({
        title: 'Algo deu errado',
        variant: 'destructive',
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <>
      {form.formState.isSubmitting && <LoadingOverlay className="flex" />}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container mx-auto block space-y-6 px-8 pb-16"
        >
          <header className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </header>
          <Separator className="my-6" />
          <main className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-14">
            <PersonalInfoForm />
            <SubscriptionForm descriptionTopics={descriptionTopics} />
          </main>
          <footer className="space-y-4">
            <ReceiveBestOpeningsCheckbox />
            <Button type="submit">Salvar</Button>
          </footer>
        </form>
      </FormProvider>
    </>
  )
}

const ReceiveBestOpeningsCheckbox = () => {
  const { setValue, watch } = useFormContext()
  const id = useId()

  return (
    <section className="flex items-center space-x-2">
      <FormCheckBox
        key={id}
        id={String(id)}
        isChecked={watch(ProfileSchemaEnum.SendBestOpenings)}
        title={
          <>
            Ignorar filtro, me mande sempre as 30 melhores vagas.
            <span className="hidden md:inline">
              (Escolhidas pelo Trampar de Casa)
            </span>
          </>
        }
        onChange={(isChecked) => {
          setValue(ProfileSchemaEnum.SendBestOpenings, isChecked)
        }}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      ></label>
    </section>
  )
}
