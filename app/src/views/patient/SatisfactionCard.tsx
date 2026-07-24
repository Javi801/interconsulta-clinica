import Card from '../../components/Card'
import RangeWithScore from '../../components/RangeWithScore'
import { TEXT } from '../../text'
import type { SatisfactionScores } from '../../types'

interface SatisfactionCardProps {
  value: SatisfactionScores
  onChange: (value: SatisfactionScores) => void
}

const SCORE_KEYS: (keyof SatisfactionScores)[] = ['work', 'family', 'couple', 'selfCare']

function SatisfactionCard({ value, onChange }: SatisfactionCardProps) {
  return (
    <Card span={4}>
      <h2>{TEXT.patient.satisfaction.title}</h2>
      <p className="subtitle mb-16">
        {TEXT.patient.satisfaction.subtitle}
      </p>
      <div className="field">
        {SCORE_KEYS.map((key) => (
          <div key={key} className="field">
            <label>{TEXT.patient.satisfaction.fields[key]}</label>
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
