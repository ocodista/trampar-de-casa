'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { PersonalInfoForm } from './components/PersonalInfoForm'
import { PreferencesForm } from './components/PreferencesForm'
import { ProfileFormState, profileFormSchema } from './form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'

const title = 'Perfil'
const description = 'Configure seu perfil para receber vagas mais assertivas.'

export default function SettingsProfilePage() {
  const form = useForm<ProfileFormState>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      linkedInUrl: 'https://linkedin.com/in/',
    },
    mode: 'onChange',
    criteriaMode: 'all',
  })

  const onSubmit = (values: ProfileFormState) => {
    console.log('Handle Submit', values)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container px-8 mx-auto space-y-6 pb-16 block"
      >
        <header className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </header>
        <Separator className="my-6" />
        <main className="flex flex-col sm:flex-row gap-6 md:gap-14">
          <PersonalInfoForm />
          <PreferencesForm />
        </main>
        <footer>
          <Button type="submit" disabled={!form.formState.isValid}>
            Salvar
          </Button>
        </footer>
      </form>
    </FormProvider>
  )
}
