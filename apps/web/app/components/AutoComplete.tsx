import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { ListOption } from './ListOption'
import { baseInputStyle } from './ui/input'

interface AutoComplete {
  options: ListOption[]
  selectedOptions: ListOption[]
  onSelectChange: (newValues: ListOption[]) => void
  placeholder: string
}

export function AutoComplete({
  options,
  placeholder,
  selectedOptions,
  onSelectChange,
  disabled,
}) {
  const [query, setQuery] = useState('')

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
        onChange={onSelectChange}
        multiple
      >
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden">
            <Combobox.Input
              className={baseInputStyle}
              displayValue={(option: any) => option.label}
              placeholder={placeholder}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          {selectedOptions.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {selectedOptions.map((option) => (
                <li key={option.value}>
                  <button
                    disabled={disabled}
                    className="cursor-pointer rounded-2xl border border-s-gray-300 px-2 py-1 text-sm font-semibold"
                    onClick={() =>
                      onSelectChange(
                        selectedOptions.filter(
                          (selectedOption) =>
                            selectedOption.value !== option.value
                        )
                      )
                    }
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nenhum resultado encontrado.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.label}
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
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
