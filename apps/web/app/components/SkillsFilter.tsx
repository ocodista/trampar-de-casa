import React, { useState, useEffect, useRef, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'

const SkillsFilter = ({
  allSkills,
  applications,
  selectedSkills = [],
  onFilterChange,
  onSelectedSkillRemove,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Filtrar apenas as skills que existem entre os candidatos
  const availableSkills = useMemo(() => {
    // Coletar todas as skills de todos os candidatos
    const candidateSkillIds = new Set()
    applications.forEach((application) => {
      const skills = application.Subscribers?.skillsId || []
      skills.forEach((skillId) => candidateSkillIds.add(skillId))
    })

    // Filtrar o array de todas as skills para incluir apenas as que existem nos candidatos
    return allSkills
      .filter((skill) => candidateSkillIds.has(skill.id.toString()))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [applications, allSkills])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSkillSelect = (skillId) => {
    const isSelected = selectedSkills.includes(skillId)
    let newSelectedSkills

    if (isSelected) {
      newSelectedSkills = selectedSkills.filter((id) => id !== skillId)
    } else {
      newSelectedSkills = [...selectedSkills, skillId]
    }

    onFilterChange(newSelectedSkills)
  }

  const getDisplayText = () => {
    if (selectedSkills.length === 0) {
      return 'Selecionar skills'
    }
    return `${selectedSkills.length} skill${
      selectedSkills.length === 1 ? '' : 's'
    } selecionada${selectedSkills.length === 1 ? '' : 's'}`
  }

  return (
    <div ref={dropdownRef} className="relative">
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        Skills
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-10 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <span className="block truncate">{getDisplayText()}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-4 w-4 text-gray-900" />
          </span>
        </button>

        {isOpen && availableSkills.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="divide-y divide-gray-100">
              {availableSkills.map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => handleSkillSelect(skill.id.toString())}
                  className={`flex cursor-pointer items-center px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedSkills.includes(skill.id.toString())
                      ? 'bg-indigo-50'
                      : ''
                  }`}
                >
                  <span className="mr-2">{skill.emoji}</span>
                  <span>{skill.name}</span>
                  {selectedSkills.includes(skill.id.toString()) && (
                    <span className="ml-auto text-indigo-600">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsFilter
