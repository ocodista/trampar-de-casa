import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const DynamicInput = ({ placeholder, options, setFilters }) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder)
  const [showOptions, setShowOptions] = useState(false)

  const handleFocus = () => {
    setCurrentPlaceholder('Type...')
  }

  const handleBlur = () => {
    setCurrentPlaceholder(placeholder)
    setShowOptions(false)
  }

  const handleOptionSelect = (option) => {
    setFilters((prevState) => [...prevState, option])
    setShowOptions(false)
  }

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
      />
      <ChevronDown className="absolute right-[10px]" />
      {showOptions && (
        <div className="absolute top-[40px] z-10 max-h-[500px] w-[400px] overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]">
          {options.map((option) => (
            <div
              key={option}
              className="w-full cursor-pointer p-[7px] hover:bg-gray-200"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DynamicInput
