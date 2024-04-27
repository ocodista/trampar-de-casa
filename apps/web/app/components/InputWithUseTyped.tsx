import { Search } from 'lucide-react'
import { useState } from 'react'
import Presentation from './presentation'
import { Filter, SelectOption } from './SelectInput'

interface InputWithUseTypedProps {
  placeholder?: string
  options: SelectOption[]
  setFilters: (filters: any) => void
  filterType: string
  filters: { option: SelectOption; inputType: string }[]
}

const InputWithUseTyped = ({
  placeholder,
  options,
  setFilters,
  filterType,
  filters,
}: InputWithUseTypedProps) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder)
  const [showOptions, setShowOptions] = useState(false)
  const [inputText, setInputText] = useState('')
  const [useTyped, setUseTyped] = useState(true)

  const handleFocus = () => {
    setCurrentPlaceholder('Type...')
    setShowOptions(true)
    setUseTyped(false)
  }

  const handleBlur = () => {
    setCurrentPlaceholder(placeholder)
    setInputText('')
    setShowOptions(false)
    setUseTyped(true)
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
    <>
      {useTyped && <Presentation />}
      <Search className="absolute left-[35px] top-[34px]" size={'25px'} />
      <input
        className="color-[#0f1115] mx-[14px] mb-[14px] mt-[7px] w-[400px] 
              rounded-[100px] border-[2px] py-[12px] pl-[60px] pr-[12px] text-left 
              text-[20px]"
        placeholder={currentPlaceholder}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => handleBlur(), 100)
        }}
        value={inputText}
      ></input>
      {showOptions && (
        <div
          className={`absolute top-[78px] z-10 max-h-[500px] w-full overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="w-full cursor-pointer p-[7px] text-left text-[15px] hover:bg-gray-200"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="w-full cursor-pointer p-[7px] text-left text-[15px] hover:bg-gray-200">
              Nenhum dado encontrado
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default InputWithUseTyped
