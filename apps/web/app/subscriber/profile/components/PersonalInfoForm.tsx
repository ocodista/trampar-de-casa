'use client'
import DateInput from '../../../components/DateInput'
import { CustomFormField, TextInput } from '../../../components/CustomFormField'
import { ProfileSchemaEnum } from '../profileSchema'

export const PersonalInfoForm = () => {
  return (
    <section className="flex flex-col gap-4">
      <CustomFormField
        name={ProfileSchemaEnum.Name}
        label="Nome"
        placeholder="Martin Fowler"
        description="Insira seu nome completo"
        Input={TextInput}
      />
      <DateInput
        name={ProfileSchemaEnum.StartedWorkingAt}
        label="Primeiro emprego com tecnologia"
        description="Tudo bem não lembrar o dia, o que importa é o mês e ano."
      />
      <CustomFormField
        name={ProfileSchemaEnum.LinkedInUrl}
        label="LinkedIn"
        placeholder="https://linkedin.com/in/SEU-PERFIL"
        description="Informe a url completa do seu LinkedIn"
        Input={TextInput}
      />
      <CustomFormField
        name={ProfileSchemaEnum.GitHub}
        label="GitHub"
        placeholder="https://github.com/"
        description="Insira a url completa do seu GitHub (opcional)"
        Input={TextInput}
      />
    </section>
  )
}
