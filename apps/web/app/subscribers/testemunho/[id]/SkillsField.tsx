'use client'

import { AutoComplete } from 'app/components/AutoComplete'
import { ListOption } from 'app/components/ListOption'
import { skills } from 'app/subscribers/profile/subscription/skills'
import { useMemo, useRef, useState } from 'react'
import { Fields } from './Fields'

const sortedSkills = skills.sort((a, b) => {
  const aFirstLetter = a.label[0].toUpperCase()
  const bFirstLetter = b.label[0].toUpperCase()
  if (aFirstLetter > bFirstLetter) {
    return 1
  }
  return -1
})

export function SkillsField() {
  const [selectedOptions, setSelectedOptions] = useState<ListOption[]>([])
  const options = useMemo(() => sortedSkills, [])
  const ghostInputRef = useRef<HTMLInputElement>(null)

  const onSelectChange = (receivedSelectedOptions: ListOption[]) => {
    ghostInputRef.current.value = receivedSelectedOptions
      .map(({ value }) => value)
      .join(',')
    const lastItem = receivedSelectedOptions[receivedSelectedOptions.length - 1]
    if (
      receivedSelectedOptions.filter(({ value }) => value === lastItem.value)
        .length > 1
    ) {
      const filteredOptions = receivedSelectedOptions.filter(
        ({ value }) => lastItem.value != value
      )
      setSelectedOptions(filteredOptions)
      return
    }
    setSelectedOptions(receivedSelectedOptions)
  }
  return (
    <section className="space-y-1">
      <label htmlFor={Fields.Role}>Quais tecnologias</label>
      <AutoComplete
        hiddenSuggestionField={true}
        disabled={false}
        selectedOptions={selectedOptions}
        onSelectChange={onSelectChange}
        placeholder="TypeScript, React, .NET"
        options={options}
      />
      <input hidden ref={ghostInputRef} type="text" name={Fields.Role} />
    </section>
  )
}
