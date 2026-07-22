interface RangeWithScoreProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

function RangeWithScore({ value, onChange, min = 1, max = 10 }: RangeWithScoreProps) {
  return (
    <div className="range-wrap">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="score-box">{value}</span>
    </div>
  )
}

export default RangeWithScore
