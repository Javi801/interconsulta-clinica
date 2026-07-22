import Card, { SectionHead } from '../../../components/Card'
import Chip from '../../../components/Chip'

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
        title="Sugerencia de derivación"
        subtitle="Resultado temporal basado en puntaje configurable."
      />
      <div className="score-panel">
        <div className="score-circle">{score}</div>
        <div>
          <h3>Sugerencia: {suggestion}</h3>
          <p className="subtitle">Umbral de demostración: {threshold} puntos.</p>
          <div className="chip-row" style={{ marginTop: 12 }}>
            <Chip
              type="radio"
              name="suggestion-valid"
              label="La sugerencia está correcta"
              checked={valid}
              onChange={() => onValidChange(true)}
            />
            <Chip
              type="radio"
              name="suggestion-valid"
              label="La sugerencia no está correcta"
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
