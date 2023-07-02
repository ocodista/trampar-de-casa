"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../../global/components/ui/button";
import { CustomFormField, TextInput } from '../../../global/components/CustomFormField';
import DateInput from "./DateInput";

enum EnglishLevel {
  Beginner,
  Intermediary,
  Advanced,
  Fluent,
}

const formSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }).min(3, {
    message: "Seu nome deve conter no mínimo 3 letras.",
  }),
  linkedInUrl: z
    .string({ required_error: "LinkedIn é obrigatório" })
    .url({ message: "Formato de URL inválido." })
    .min(28, {
      message: "Seu LinkedIn é obrigatório.",
    })
    .startsWith(
      "https://linkedin.com/in/",
      "URL do perfil deve começar com https://linkedin.com/in/"
    ),
  github: z.string().url({ message: "Formato de URL inválido." }).optional(),
  startDate: z.date({
    required_error: "Selecione a data do seu primeiro emprego",
  }),
  englishLevel: z.nativeEnum(EnglishLevel),
});

type AboutYouFormState = z.infer<typeof formSchema>;

export const AboutYouForm = () => {
  const form = useForm<AboutYouFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkedInUrl: "https://linkedin.com/in/",
    },
    mode: "onChange",
  });

  const onSubmit = (values: AboutYouFormState) => {
    console.log("Submitted");
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField
          name="name"
          label="Nome"
          placeholder="Martin Fowler"
          description="Insira seu nome completo"
          Input={TextInput}
        />
        <DateInput
          name="startDate"
          label="Primeiro emprego com tecnologia"
          description="Tudo bem não lembrar o dia, o que importa é o mês e ano."
        />
        <CustomFormField
          name="linkedInUrl"
          label="LinkedIn"
          placeholder="https://linkedin.com/in/SEU-PERFIL"
          description="Informe a url completa do seu LinkedIn"
          Input={TextInput}
        />
        <CustomFormField
          name="github"
          label="GitHub"
          placeholder="https://github.com/"
          description="Insira a url completa do seu GitHub (opcional)"
          Input={TextInput}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Salvar
        </Button>
      </form>
    </FormProvider>
  );
};
