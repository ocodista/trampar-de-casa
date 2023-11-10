'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormCheckBox } from '../components/FormCheckBox'
import { ProfileSchemaEnum } from '../profileSchema'

export const ReceiveEmailConfig = ({
  descriptionTopics,
}: {
  descriptionTopics: { name: string; id: number }[]
}) => {
  const [selectOptions, setSelectOptions] = useState<string[]>([])
  const { setValue, watch, formState } = useFormContext()
  const receiveEmailConfig = watch(
    ProfileSchemaEnum.ReceiveEmailConfig
  ) as string[]
  const errorMessage = formState.errors[ProfileSchemaEnum.ReceiveEmailConfig]
  useEffect(() => {
    if (!selectOptions.length && receiveEmailConfig?.length) {
      setSelectOptions(receiveEmailConfig)
    }
  }, [])

  useEffect(() => {
    setValue(ProfileSchemaEnum.ReceiveEmailConfig, selectOptions, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }, [selectOptions])
  return (
    <div className="flex flex-col gap-2">
      <label className="mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Quero receber
      </label>
      {descriptionTopics.map(({ name, id }) => (
        <FormCheckBox
          key={id}
          id={String(id)}
          isChecked={selectOptions.includes(String(id))}
          title={name}
          onChange={(isChecked) => {
            if (isChecked) {
              setSelectOptions([...selectOptions, String(id)])
              return
            }
            setSelectOptions(
              selectOptions.filter((currentId) => String(id) !== currentId)
            )
          }}
        />
      ))}
      {errorMessage ? (
        <p className="text-sm text-red-600">
          {errorMessage.message.toString()}
        </p>
      ) : null}
    </div>
  )
}
