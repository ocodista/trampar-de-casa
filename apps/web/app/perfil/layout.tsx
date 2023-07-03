'use client'
import { Separator } from '../components/ui/separator'
import { SidebarNav } from './components/sidebar-nav'
import { FormProvider, useForm } from 'react-hook-form'

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

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const form = useForm()
  return (
    <>
      <FormProvider {...form}>
        <div className="container px-8 mx-auto space-y-6 pb-16 block">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </FormProvider>
    </>
  )
}
