import { Combobox, Transition } from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Fragment, useRef, useState } from 'react'
import { FilteredSelections } from './FilteredSelections'
import { ListOption } from './ListOption'
import { SkillSuggestionDialog } from './SkillSuggestionDialog'
import { baseInputStyle } from './ui/input'

interface AutoComplete {
  options: ListOption[]
  selectedOptions: ListOption[]
  onSelectChange: (newValues: ListOption[]) => void
  placeholder: string
}

type Props = {
  options: ListOption[]
  placeholder: string
  selectedOptions: ListOption[]
  onSelectChange: (listOption: ListOption[]) => void
  disabled: boolean
}

export function AutoComplete({
  options,
  placeholder,
  selectedOptions,
  onSelectChange,
  disabled,
}: Props) {
  const [query, setQuery] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const openSelectComboboxButton = useRef<HTMLButtonElement>(null)
  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="w-full">
      <Combobox
        disabled={disabled}
        value={selectedOptions}
        onChange={(listOptions) => {
          onSelectChange(listOptions)
          setQuery('')
        }}
        multiple
      >
        <div className="relative ">
          <div className="relative w-full overflow-hidden">
            <Combobox.Button
              ref={openSelectComboboxButton}
              as="section"
              className={`${baseInputStyle} h-auto w-full`}
            >
              {selectedOptions.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {selectedOptions.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        disabled={disabled}
                        className="cursor-pointer rounded-2xl border border-s-gray-300 px-2 py-1 text-sm font-semibold"
                        onClick={() => {
                          onSelectChange(
                            selectedOptions.filter(
                              (selectedOption) =>
                                selectedOption.value !== option.value
                            )
                          )
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-slate-500">{placeholder}</span>
              )}
            </Combobox.Button>
            <button
              onClick={() => openSelectComboboxButton.current?.click()}
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronDownIcon
                className={`h-5 w-5 text-slate-400 transition-all ${
                  !isOpened ? '' : 'rotate-180'
                }`}
              />
            </button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              setQuery('')
              setIsOpened(false)
            }}
            afterEnter={() => setIsOpened(true)}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto scroll-smooth rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <div className="flex w-full border-b border-slate-300">
                <div className="grid place-content-center p-2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-slate-500" />
                </div>
                <Combobox.Input
                  className={
                    'border-input bg-background placeholder:text-muted-foreground flex h-10 w-full flex-1 rounded-md border border-none px-3 py-2 text-sm outline-none  file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                  }
                  displayValue={(option: { label: string }) => option.label}
                  placeholder={'Buscar'}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <FilteredSelections
                selectedSkills={selectedOptions}
                options={filteredOptions}
                query={query}
              />
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <SkillSuggestionDialog />
    </div>
  )
}
