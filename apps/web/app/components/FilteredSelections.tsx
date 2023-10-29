import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { ListOption } from './ListOption'

function sortOptions(array: ListOption[], label: string) {
  if (!label) return array
  const [exactMatchItems, partialMatchItems] = array.reduce(
    (accumulativeArray, listOption) => {
      if (listOption.label.toLowerCase() === label.toLowerCase()) {
        accumulativeArray[0] = [...accumulativeArray[0], listOption]
        return accumulativeArray
      }
      const queryLength = label.length
      const slicedItemLabel = listOption.label.slice(0, queryLength)
      if (slicedItemLabel.toLowerCase() === label.toLowerCase()) {
        accumulativeArray[1] = [...accumulativeArray[1], listOption]
        return accumulativeArray
      }
      return accumulativeArray
    },
    [[], []]
  )

  partialMatchItems.sort(
    (a, b) =>
      Math.abs(a.label.length - label.length) -
      Math.abs(b.label.length - label.length)
  )

  const sortedArray = exactMatchItems.concat(partialMatchItems)

  return sortedArray
}

const optionHof = (label: string) => {
  const Option = ({
    active,
    selected,
  }: {
    selected: boolean
    active: boolean
  }) => {
    return (
      <>
        <span
          className={`block truncate ${
            selected ? 'font-medium' : 'font-normal'
          }`}
        >
          {label}
        </span>
        {selected ? (
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

export function FilteredSelections({
  options,
  query,
}: {
  options: ListOption[]
  query: string
}) {
  const orderedOptions = React.useMemo(
    () => sortOptions(options, query),
    [query, options]
  )
  if (!orderedOptions.length)
    return (
      <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
        Nenhum resultado encontrado.
      </div>
    )

  return (
    <div className="max-h-48 overflow-y-auto">
      {orderedOptions.map((option) => (
        <Combobox.Option
          key={option.value}
          className={({ active }) =>
            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
              active ? 'bg-blue-600 text-white' : 'text-gray-900'
            }`
          }
          value={option}
        >
          {optionHof(option.label)}
        </Combobox.Option>
      ))}
    </div>
  )
}
