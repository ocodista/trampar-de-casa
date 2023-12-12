'use client'

import { AutoComplete } from 'app/components/AutoComplete'
import { ListOption } from 'app/components/ListOption'
import { skills } from 'app/subscribers/profile/subscription/skills'
import { useEffect, useMemo, useRef, useState } from 'react'
import { REQUIRED_LABEL_STYLE } from './Field'
import { Fields } from './Fields'

const sortedSkills = skills.sort((a, b) => {
  const aFirstLetter = a.label[0].toUpperCase()
  const bFirstLetter = b.label[0].toUpperCase()
  if (aFirstLetter > bFirstLetter) {
    return 1
  }
  return -1
})

const ErrorMessage = ({ message }: { message: string | null }) => {
  if (!message) return null

  return <p className="text-destructive text-sm font-medium">{message}</p>
}

export function SkillsField({ formId }: { formId: string }) {
  const [selectedOptions, setSelectedOptions] = useState<ListOption[]>([])
  const options = useMemo(() => sortedSkills, [])
  const ghostInputRef = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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

  useEffect(() => {
    const formElement = document.querySelector(`#${formId}`)
    const submitHandler = (e: { preventDefault: () => void }) => {
      setErrorMessage(null)
      if (!selectedOptions.length) {
        e.preventDefault()
        setErrorMessage('Selecione pelo menos uma tecnologia.')
      }
    }
    formElement.addEventListener('submit', submitHandler)

    return () => formElement.removeEventListener('submit', submitHandler)
  }, [formId, selectedOptions])

  return (
    <section className="space-y-1">
      <label htmlFor={Fields.Role} className={REQUIRED_LABEL_STYLE}>
        Quais tecnologias
      </label>
      <AutoComplete
        hiddenSuggestionField={true}
        disabled={false}
        selectedOptions={selectedOptions}
        onSelectChange={onSelectChange}
        placeholder="TypeScript, React, .NET"
        options={options}
      />
      <ErrorMessage message={errorMessage} />
      <input hidden ref={ghostInputRef} type="text" name={Fields.Skills} />
    </section>
  )
}
