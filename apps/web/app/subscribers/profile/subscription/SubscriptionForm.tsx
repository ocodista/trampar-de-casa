'use client'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { EnglishLevel } from '../../../../global/EnglishLevel'
import { CustomFormField } from '../../../components/CustomFormField'
import { FormRadioGroup } from '../../../components/FormRadioGroup'
import { SkillsField } from '../components/SkillsField'
import { ProfileSchemaEnum } from '../profileSchema'
import { ReceiveEmailConfig } from './ReceiveEmailConfig'

const { None, Beginner, Intermediary, Advanced, Fluent } = EnglishLevel

const LevelQuestions: Record<string, string> = {
  [None]: 'Não informar',
  [Beginner]: 'Iniciante',
  [Intermediary]: 'Intermediário',
  [Advanced]: 'Avançado',
  [Fluent]: 'Fluente',
}

const EnglishLevelGroup = () => {
  const {
    setValue,
    watch,
    formState: { isSubmitting },
  } = useFormContext()
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
          disabled={isSubmitting}
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

export const SubscriptionForm = ({
  descriptionTopics,
}: {
  descriptionTopics: { name: string; id: number }[]
}) => (
  <section className="flex flex-col gap-6">
    <SkillsField />
    <EnglishLevelGroup />
    <ReceiveEmailConfig descriptionTopics={descriptionTopics} />
  </section>
)
