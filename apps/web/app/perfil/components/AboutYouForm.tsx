'use client'
import DateInput from '../../components/DateInput'
import { CustomFormField, TextInput } from '../../components/CustomFormField'
import { ProfileFormKeys } from '../form'

export const AboutYouForm = () => {
  return (
    <>
      <CustomFormField
        name={ProfileFormKeys.Name}
        label="Nome"
        placeholder="Martin Fowler"
        description="Insira seu nome completo"
        Input={TextInput}
      />
      <DateInput
        name={ProfileFormKeys.StartDate}
        label="Primeiro emprego com tecnologia"
        description="Tudo bem não lembrar o dia, o que importa é o mês e ano."
      />
      <CustomFormField
        name={ProfileFormKeys.LinkedInUrl}
        label="LinkedIn"
        placeholder="https://linkedin.com/in/SEU-PERFIL"
        description="Informe a url completa do seu LinkedIn"
        Input={TextInput}
      />
      <CustomFormField
        name={ProfileFormKeys.GitHub}
        label="GitHub"
        placeholder="https://github.com/"
        description="Insira a url completa do seu GitHub (opcional)"
        Input={TextInput}
      />
    </>
  )
}
