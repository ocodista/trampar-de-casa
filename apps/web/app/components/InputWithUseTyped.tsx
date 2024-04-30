import React, { useState, useEffect, useRef } from 'react'
import useTyped from '../components/hooks/useTyped'
import { Search } from 'lucide-react'
import { Filter, SelectOption } from './SelectInput'

interface InputWithUseTypedProps {
  placeholder?: string
  options: SelectOption[]
  setFilters: (filters: any) => void
  filterType: string
  filters: { option: SelectOption; inputType: string }[]
}

const useTypedStrings = [
  `Figma`,
  `AWS`,
  `Typescript`,
  `Javascript`,
  `React`,
  `Tailwind`,
  `Node`,
  `Outros`,
]

const InputWithUseTyped = ({
  placeholder,
  options,
  setFilters,
  filterType,
  filters,
}: InputWithUseTypedProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [typedEnabled, setTypedEnabled] = useState(true)
  const typedInstance = useTyped(
    inputRef,
    {
      strings: useTypedStrings,
      typeSpeed: 90,
      backSpeed: 90,
      loop: true,
    },
    typedEnabled
  )

  const [showOptions, setShowOptions] = useState(false)
  const [inputText, setInputText] = useState('')

  const handleFocus = () => {
    setShowOptions(true)
    setTypedEnabled(false)
  }

  const handleBlur = () => {
    setShowOptions(false)
    setInputText('')
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
      <Search className="absolute left-[35px] top-[34px]" size={'25px'} />
      <input
        ref={inputRef}
        className="color-[#0f1115] z-30 mx-[14px] mb-[14px] mt-[7px] w-[400px] rounded-[100px] border-[2px] py-[12px] pl-[60px] pr-[12px] text-left text-[20px]"
        placeholder={typedEnabled ? '' : placeholder}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => handleBlur(), 100)
        }}
        value={inputText}
      />
      {showOptions && (
        <div
          className={`absolute top-[80px] z-10 max-h-[500px] w-full overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]`}
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
