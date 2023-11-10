import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useMemo } from 'react'
import { ListOption } from './ListOption'

const optionHof = (label: string, selectedSkills: ListOption[]) => {
  const Option = ({
    active,
    selected,
  }: {
    selected: boolean
    active: boolean
  }) => {
    const isOptionSelected = useMemo(
      () => selectedSkills.map(({ label }) => label).includes(label),
      [selectedSkills]
    )
    return (
      <>
        <span
          className={`block truncate ${
            selected ? 'font-medium' : 'font-normal'
          }`}
        >
          {label}
        </span>
        {isOptionSelected ? (
          <span
            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
              active ? 'text-white' : 'text-blue-600'
            }`}
          >
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </>
    )
  }
  return Option
}
export const ComboOption = ({
  selectedSkills,
  option,
}: {
  selectedSkills: ListOption[]
  option: ListOption
}) => {
  return (
    <Combobox.Option
      key={option.value}
      className={({ active }) =>
        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
          active ? 'bg-blue-600 text-white' : 'text-gray-900'
        }`
      }
      value={option}
    >
      {optionHof(option.label, selectedSkills)}
    </Combobox.Option>
  )
}
