import Chip from './Chip'

interface ChipGroupProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

function ChipGroup({ options, selected, onChange }: ChipGroupProps) {
  const toggle = (option: string, checked: boolean) =>
    onChange(checked ? [...selected, option] : selected.filter((item) => item !== option))

  return (
    <div className="chip-row">
      {options.map((option) => (
        <Chip
          key={option}
          label={option}
          checked={selected.includes(option)}
          onChange={(checked) => toggle(option, checked)}
        />
      ))}
    </div>
  )
}

export default ChipGroup
