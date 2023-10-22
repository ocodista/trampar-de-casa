import { ToogleGroup, ToogleGroupItem } from 'app/components/ui/ToggleGroup'

type SectionTogglesGroupProps = {
  sectionLabel: string
  selectedToggles: string[]
  setSelectedToggles: (value: string[]) => void
  availableFilters: string[]
}

export const SectionTogglesGroup = ({
  sectionLabel,
  availableFilters,
  selectedToggles,
  setSelectedToggles,
}: SectionTogglesGroupProps) => {
  return (
    <div>
      <span className="mb-2 inline-block text-sm font-medium text-gray-600">
        {sectionLabel}
      </span>
      <ToogleGroup
        type="multiple"
        value={selectedToggles}
        onValueChange={setSelectedToggles}
      >
        {availableFilters.map((item) => (
          <ToogleGroupItem key={item} value={item}>
            {item}
          </ToogleGroupItem>
        ))}
      </ToogleGroup>
    </div>
  )
}
