import React from 'react'
import { ComboOption } from './ComboOption'
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
    [[], [] as ListOption[]]
  )

  partialMatchItems.sort(
    (a, b) =>
      Math.abs(a.label.length - label.length) -
      Math.abs(b.label.length - label.length)
  )

  const sortedArray = exactMatchItems.concat(partialMatchItems) as ListOption[]
  return sortedArray
}

export function FilteredSelections({
  options,
  query,
  selectedSkills,
}: {
  options: ListOption[]
  query: string
  selectedSkills: ListOption[]
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
        <ComboOption
          option={option}
          selectedSkills={selectedSkills}
          key={option.value}
        />
      ))}
    </div>
  )
}
