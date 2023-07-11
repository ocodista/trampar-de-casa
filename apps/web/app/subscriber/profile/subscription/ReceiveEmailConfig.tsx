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
  const { setValue, watch } = useFormContext()
  const receiveEmailConfig = watch(
    ProfileSchemaEnum.ReceiveEmailConfig
  ) as string[]
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
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
        Quero receber
      </label>
      {descriptionTopics.map(({ name, id }) => (
        <FormCheckBox
          key={id}
          id={String(id)}
          isChecked={selectOptions.some((options) => options === String(id))}
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
    </div>
  )
}
