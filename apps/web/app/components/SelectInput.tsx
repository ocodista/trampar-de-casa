import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'

export type SelectOption = {
  value: string | number
  label: string
}

export type Filter = {
  option: SelectOption
  inputType: string
}

interface DynamicInputProps {
  placeholder: string
  options: SelectOption[]
  filterType: string
  setFilters: (filters: any) => void
  filters: { option: SelectOption; inputType: string }[]
}

const SelectInput = ({
  placeholder,
  options,
  filterType,
  setFilters,
  filters,
}: DynamicInputProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const [inputText, setInputText] = useState('')
  const [currentPlaceholder, setCurrentPlaceholder] = useState<string>()

  const handleFocus = () => {
    setCurrentPlaceholder('Type...')
    setShowOptions(true)
  }

  const handleBlur = () => {
    setCurrentPlaceholder(placeholder)
    setInputText('')
    setShowOptions(false)
  }

  const handleOptionSelect = (option: SelectOption) => {
    if (
      filters.some((filter: Filter) => filter.option.value === option.value)
    ) {
      return
    }
    setFilters((prevState: Filter[]) => [
      ...prevState,
      { option: option, inputType: filterType },
    ])
    setShowOptions(false)
  }
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputText.toLowerCase())
  )

  return (
    <div className="relative flex items-center">
      <input
        placeholder={currentPlaceholder ? currentPlaceholder : placeholder}
        className="border-box z-[2] w-[150px] rounded-[20px] border-[1px] bg-transparent py-[9px] pl-[14px] pr-[9px] placeholder-black placeholder-opacity-100"
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => handleBlur(), 100)
        }}
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <ChevronDown className="z-1 absolute right-[10px]" />
      {showOptions && (
        <div
          className={`absolute top-[47px] z-10 max-h-[500px] w-[400px] overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="w-full cursor-pointer p-[7px] hover:bg-gray-200"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="w-full cursor-pointer p-[7px] hover:bg-gray-200">
              Nenhum dado encontrado
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SelectInput
