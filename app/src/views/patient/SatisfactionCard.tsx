import Card from '../../components/Card'
import RangeWithScore from '../../components/RangeWithScore'
import type { SatisfactionScores } from '../../types'

interface SatisfactionCardProps {
  value: SatisfactionScores
  onChange: (value: SatisfactionScores) => void
}

const SCORE_FIELDS: { key: keyof SatisfactionScores; label: string }[] = [
  { key: 'work', label: 'Trabajo' },
  { key: 'family', label: 'Familia' },
  { key: 'couple', label: 'Pareja' },
  { key: 'selfCare', label: 'Autocuidado' },
  { key: 'general', label: 'Satisfacción general' },
]

function SatisfactionCard({ value, onChange }: SatisfactionCardProps) {
  return (
    <Card span={4}>
      <h2>Funcionamiento y satisfacción</h2>
      <p className="subtitle" style={{ marginBottom: 16 }}>
        1 = muy baja satisfacción; 10 = muy alta.
      </p>
      <div className="field">
        {SCORE_FIELDS.map(({ key, label }) => (
          <div key={key} className="field">
            <label>{label}</label>
            <RangeWithScore
              value={value[key]}
              onChange={(score) => onChange({ ...value, [key]: score })}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}

export default SatisfactionCard
