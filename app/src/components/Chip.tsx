interface ChipProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  type?: 'checkbox' | 'radio'
  name?: string
}

function Chip({ label, checked, onChange, type = 'checkbox', name }: ChipProps) {
  return (
    <label className="chip">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />{' '}
      {label}
    </label>
  )
}

export default Chip
