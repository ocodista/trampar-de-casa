'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, ControllerRenderProps, Path, useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../global/components/ui/form';
import { Input } from '../../global/components/ui/input';
import { Button } from '../../global/components/ui/button';
import { LEGENDARY_PROGRAMMERS } from '../../global/constants';
import { oneOf } from '../../global/utils';
import { CustomFormField } from '../../global/components/CustomFormField';

enum EnglishLevel {
  Beginner,
  Intermediary,
  Advanced,
  Fluent
}

const formSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
  email: z.string().email(),
  linkedInUrl: z.string({ required_error: 'LinkedIn é obrigatório' }).url({ message: 'Formato de URL inválido.' }).startsWith('https://linkedin.com/in/', 'URL do perfil deve começar com https://linkedin.com/in/'),
  github: z.string().url({ message: 'Formato de URL inválido.' }).optional(),
  yearsOfExperience: z.number({ required_error: 'Precisamos saber da sua experiência' }).positive({ message: 'Experiência não pode ser negativa.' }),
  englishLevel: z.nativeEnum(EnglishLevel),
})


type SubscriberFormState = z.infer<typeof formSchema>

interface SubscriberFormProps {
  email: string
}
export const SubscriberForm = ({ email }: SubscriberFormProps) => {
  const form = useForm<SubscriberFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      linkedInUrl: 'https://linkedin.com/in/',
      yearsOfExperience: 1
    }
  })

  const onSubmit = (values: SubscriberFormState) => {
    console.log("Submitted")
    console.log(values)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField 
          name="name"
          label="Nome"
          placeholder={"Martin Fowler"}
          description="Insira seu nome completo"
        />
        <CustomFormField
          name="linkedInUrl"
          label="LinkedIn"
          placeholder="https://linkedin.com/in/SEU-PERFIL"
          description="Informe a url completa do seu LinkedIn"
        />
        <CustomFormField
          name="github"
          label="GitHub"
          placeholder="https://github.com/"
          description="Insira a url completa do seu GitHub (opcional)"
        />
        <CustomFormField
          name="yearsOfExperience"
          label="Ano(s) de Experiência"
          type="number"
          placeholder="Ex: 1"
          description="Há quantos anos você trabalha com tecnologia?"
        />
        <Button type="submit">Salvar</Button>
      </form>
    </FormProvider>
  )
}