import React, { useEffect } from 'react'
import { FormSchema } from 'app/(roles)/formSchema'
import { FormRadioGroup } from 'app/components/FormRadioGroup'
import { FormMessage } from 'app/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { Topics } from 'shared/src/enums/topics'

export const RoleTopic: React.FC = () => {
  const { setValue, watch, formState, trigger } = useFormContext<FormSchema>()
  const fieldId = 'topicId'

  useEffect(() => {
    setValue(fieldId, Topics.NATIONAL_VACANCIES, { shouldValidate: true })
  }, [setValue])

  const handleOptionChange = (option: string) => {
    setValue(fieldId, parseInt(option, 10), { shouldValidate: true })
    trigger(fieldId)
  }

  return (
    <section className="flex flex-col gap-4 space-x-2">
      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Esta é uma vaga:<span className="text-red-600">*</span>
      </p>
      <FormRadioGroup
        disabled={formState.isSubmitting}
        options={[
          {
            label: 'Internacional',
            value: Topics.INTERNATIONAL_VACANCIES.toString(),
          },
          {
            label: 'Nacional',
            value: Topics.NATIONAL_VACANCIES.toString(),
          },
        ]}
        formKey={fieldId}
        selectedOption={watch(fieldId)?.toString()}
        setSelectedOption={handleOptionChange}
      />
      {formState.errors?.topicId?.message && (
        <FormMessage>{formState.errors.topicId.message}</FormMessage>
      )}
    </section>
  )
}
