'use client'
import { useEffect, useState } from 'react'
import { EnglishLevel } from '../../../global/EnglishLevel'
import { CustomFormField } from '../../components/CustomFormField'
import { FormRadioGroup } from '../../components/FormRadioGroup'
import { ProfileFormKeys } from '../form'
import { SkillsField } from './SkillsField'
import { Checkbox } from '../../components/ui/checkbox'
import { useFormContext } from 'react-hook-form'

const { Beginner, Intermediary, Advanced, Fluent } = EnglishLevel

const LevelQuestions: Record<string, string> = {
  [Beginner]: 'Iniciante',
  [Intermediary]: 'Intermediário',
  [Advanced]: 'Avançado',
  [Fluent]: 'Fluente',
}

const FormCheckBox = ({ id, title }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={id} />
    <label
      htmlFor={id}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {title}
    </label>
  </div>
)

const ReceiveEmailConfig = () => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
      Quero receber
    </label>
    <FormCheckBox
      id={ProfileFormKeys.InternationalRoles}
      title="Vagas internacionais"
    />
    <FormCheckBox id={ProfileFormKeys.NationalRoles} title="Vagas nacionais" />
    <FormCheckBox id={ProfileFormKeys.NationalRoles} title="Dicas de inglês" />
  </div>
)
const EnglishLevelGroup = () => {
  const { setValue } = useFormContext()
  const [englishLevel, setEnglishLevel] = useState(EnglishLevel.Beginner)
  useEffect(() => {
    if (!englishLevel) return
    setValue(ProfileFormKeys.EnglishLevel, englishLevel, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [englishLevel, setValue])

  return (
    <CustomFormField
      className="flex flex-col gap-2"
      name={ProfileFormKeys.EnglishLevel}
      label="Nível de Inglês"
      Input={() => (
        <FormRadioGroup
          selectedOption={englishLevel}
          setSelectedOption={(option: EnglishLevel) => setEnglishLevel(option)}
          options={Object.keys(EnglishLevel).map((key) => ({
            label: LevelQuestions[key] as string,
            value: EnglishLevel[key],
          }))}
          formKey={ProfileFormKeys.EnglishLevel}
        />
      )}
    />
  )
}

export const PreferencesForm = () => (
  <section className="flex flex-col gap-4">
    <SkillsField />
    <EnglishLevelGroup />
    <ReceiveEmailConfig />
    <div className=""></div>
  </section>
)
