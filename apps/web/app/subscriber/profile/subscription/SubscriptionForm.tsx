'use client'
import { useEffect, useState } from 'react'
import { EnglishLevel } from '../../../../global/EnglishLevel'
import { CustomFormField } from '../../../components/CustomFormField'
import { FormRadioGroup } from '../../../components/FormRadioGroup'
import { SkillsField } from '../components/SkillsField'
import { Checkbox } from '../../../components/ui/checkbox'
import { useFormContext } from 'react-hook-form'
import { SubscriptionTopicsEnum } from '../../subscriptionTopics'
import { ProfileSchemaEnum } from '../profileSchema'

const { None, Beginner, Intermediary, Advanced, Fluent } = EnglishLevel

const LevelQuestions: Record<string, string> = {
  [None]: 'Não informar',
  [Beginner]: 'Iniciante',
  [Intermediary]: 'Intermediário',
  [Advanced]: 'Avançado',
  [Fluent]: 'Fluente',
}

const FormCheckBox = ({ id, title }) => {
  const { register } = useFormContext()
  return (
    <div className="flex items-center space-x-2">
      <Checkbox name={id} id={id} {...register(id)} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {title}
      </label>
    </div>
  )
}

const ReceiveEmailConfig = () => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
        Quero receber
      </label>
      <FormCheckBox
        id={SubscriptionTopicsEnum.InternationalRoles}
        title="Vagas internacionais"
      />
      <FormCheckBox
        id={SubscriptionTopicsEnum.NationalRoles}
        title="Vagas nacionais"
      />
      <FormCheckBox
        id={SubscriptionTopicsEnum.EnglishTips}
        title="Dicas de inglês"
      />
    </div>
  )
}
const EnglishLevelGroup = () => {
  const { setValue, watch } = useFormContext()
  const [englishLevel, setEnglishLevel] = useState(EnglishLevel.None)
  useEffect(() => {
    if (!englishLevel) return
    setValue(ProfileSchemaEnum.EnglishLevel, englishLevel, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [englishLevel, setValue])

  const formEnglishLevel = watch(ProfileSchemaEnum.EnglishLevel)
  useEffect(() => {
    if (
      (englishLevel && englishLevel !== EnglishLevel.None) ||
      !formEnglishLevel
    ) {
      return
    }

    if (formEnglishLevel !== englishLevel) {
      setEnglishLevel(formEnglishLevel)
    }
  }, [formEnglishLevel])

  return (
    <CustomFormField
      className="flex flex-col gap-2"
      name={ProfileSchemaEnum.EnglishLevel}
      label="Nível de Inglês"
      Input={() => (
        <FormRadioGroup
          selectedOption={englishLevel}
          setSelectedOption={(option: EnglishLevel) => setEnglishLevel(option)}
          options={Object.keys(EnglishLevel).map((key) => ({
            label: LevelQuestions[key] as string,
            value: EnglishLevel[key],
          }))}
          formKey={ProfileSchemaEnum.EnglishLevel}
        />
      )}
    />
  )
}

export const SubscriptionForm = () => (
  <section className="flex flex-col gap-4">
    <SkillsField />
    <EnglishLevelGroup />
    <ReceiveEmailConfig />
  </section>
)
