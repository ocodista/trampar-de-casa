import { FormSchema } from 'app/(roles)/formSchema'
import { FormRadioGroup } from 'app/components/FormRadioGroup'
import { FormMessage } from 'app/components/ui/form'
import { useId } from 'react'
import { useFormContext } from 'react-hook-form'
import { Topics } from 'shared/src/enums/topics'

export const RoleTopic = () => {
  const { setValue, watch, formState } = useFormContext<FormSchema>()
  const fieldId = 'topicsId'
  const id = useId()

  return (
    <section className="flex flex-col gap-4 space-x-2">
      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Esta é uma vaga:<span className="text-red-600">*</span>
      </p>
      <FormRadioGroup
        key={id}
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
        formKey={id}
        selectedOption={
          watch(fieldId) === Topics.INTERNATIONAL_VACANCIES.toString()
            ? Topics.INTERNATIONAL_VACANCIES.toString()
            : Topics.NATIONAL_VACANCIES.toString()
        }
        setSelectedOption={(option) => {
          setValue(fieldId, option)
        }}
      />
      {formState.errors?.topicsId?.message && (
        <FormMessage>{formState.errors?.topicsId.message}</FormMessage>
      )}
    </section>
  )
}
