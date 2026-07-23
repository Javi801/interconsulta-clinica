import Card, { SectionHead } from '../../../components/Card'
import Chip from '../../../components/Chip'
import { TEXT } from '../../../text'

interface SuggestionCardProps {
  score: number
  threshold: number
  suggestion: string
  valid: boolean
  onValidChange: (valid: boolean) => void
}

function SuggestionCard({ score, threshold, suggestion, valid, onValidChange }: SuggestionCardProps) {
  return (
    <Card span="full">
      <SectionHead
        title={TEXT.psych.suggestion.title}
        subtitle={TEXT.psych.suggestion.subtitle}
      />
      <div className="score-panel">
        <div className="score-circle">{score}</div>
        <div>
          <h3>{TEXT.psych.suggestion.suggestionLabel(suggestion)}</h3>
          <p className="subtitle">{TEXT.psych.suggestion.thresholdLabel(threshold)}</p>
          <div className="chip-row" style={{ marginTop: 12 }}>
            <Chip
              type="radio"
              name="suggestion-valid"
              label={TEXT.psych.suggestion.valid}
              checked={valid}
              onChange={() => onValidChange(true)}
            />
            <Chip
              type="radio"
              name="suggestion-valid"
              label={TEXT.psych.suggestion.invalid}
              checked={!valid}
              onChange={() => onValidChange(false)}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SuggestionCard
