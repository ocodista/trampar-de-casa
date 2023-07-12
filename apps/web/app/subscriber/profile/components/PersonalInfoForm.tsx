'use client'
import {
  CustomFormField,
  StartWorkAtInput,
  TextInput,
} from '../../../components/CustomFormField'
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
      <CustomFormField
        name={ProfileSchemaEnum.StartedWorkingAt}
        label="Primeiro emprego com tecnologia"
        Input={StartWorkAtInput}
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
