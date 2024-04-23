import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const DynamicInput = ({
  placeholder,
  options,
  setFilters,
  fetchJobs,
  filterType,
  filters,
  optionConfig = 'w-[400px]',
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder)
  const [showOptions, setShowOptions] = useState(false)
  const [inputText, setInputText] = useState('')

  const handleFocus = () => {
    setCurrentPlaceholder('Type...')
  }

  const handleBlur = () => {
    setCurrentPlaceholder(placeholder)
    setInputText('')
    setShowOptions(false)
  }

  const handleOptionSelect = (option) => {
    if (filters.includes(option)) {
      return
    }
    setFilters((prevState) => [...prevState, option])
    fetchJobs(option, filterType)
    setShowOptions(false)
  }

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputText.toLowerCase())
  )

  return (
    <div className="relative flex items-center">
      <input
        placeholder={currentPlaceholder}
        className="border-box w-[150px] rounded-[20px] border-[1px] bg-[#F4F4F5] py-[9px] pl-[14px] pr-[9px] placeholder-black placeholder-opacity-100"
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => handleBlur(), 100)
        }}
        onClick={() => setShowOptions(true)}
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <ChevronDown className="absolute right-[10px]" />
      {showOptions && (
        <div
          className={`absolute top-[40px] z-10 max-h-[500px] ${optionConfig} overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                className="w-full cursor-pointer p-[7px] hover:bg-gray-200"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
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

export default DynamicInput
