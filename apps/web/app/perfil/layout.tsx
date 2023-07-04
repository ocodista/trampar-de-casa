'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '../components/ui/separator'
import { SidebarNav } from './components/sidebar-nav'
import { FormProvider, useForm } from 'react-hook-form'
import { ProfileFormState, profileFormSchema } from './form'
import { Button } from '../components/ui/button'

const title = 'Preferências'
const description = 'Configure seu perfil para receber vagas mais assertivas.'

const sidebarNavItems = [
  {
    title: 'Sobre você',
    href: '/perfil',
  },
  {
    title: 'Preferências',
    href: '/perfil/preferencias',
  },
]

interface ProfileLayout {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayout) {
  const form = useForm<ProfileFormState>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      linkedInUrl: 'https://linkedin.com/in/',
    },
    mode: 'onChange',
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
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <main className="flex-1 lg:max-w-2xl">{children}</main>
          <footer>
            <Button type="submit" disabled={!form.formState.isValid}>
              Salvar
            </Button>
          </footer>
        </div>
      </form>
    </FormProvider>
  )
}
