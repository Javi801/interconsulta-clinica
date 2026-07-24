import Card, { SectionHead } from '../../../components/Card'
import Chip from '../../../components/Chip'
import { TEXT } from '../../../text'
import type { SadPersonsResult, SadPersonsSource } from '../../../utils/sadPersons'
import type { SadPersonsKey } from '../../../types'

interface SuggestionCardProps {
  result: SadPersonsResult
  valid: boolean
  onToggle: (key: SadPersonsKey, scored: boolean) => void
  onValidChange: (valid: boolean) => void
}

const { suggestion } = TEXT.psych

const SOURCE_LABEL: Record<SadPersonsSource, string> = {
  patient: suggestion.sources.patient,
  psych: suggestion.sources.psych,
  both: suggestion.sources.both,
}

const BAND_COLOR: Record<string, string> = {
  Bajo: '#3b8f4f',
  Moderado: '#c99a00',
  Alto: '#d9822b',
  'Muy alto': '#c0392b',
}

function SuggestionCard({ result, valid, onToggle, onValidChange }: SuggestionCardProps) {
  const bandColor = BAND_COLOR[result.band]

  return (
    <Card span="full">
      <SectionHead title={suggestion.title} subtitle={suggestion.subtitle} />
      <div className="score-panel">
        <div className="score-circle" style={{ background: bandColor, color: '#fff' }}>
          {result.score}
        </div>
        <div>
          <h3 style={{ color: bandColor }}>{suggestion.scoreLabel(result.score, result.band)}</h3>
          <p className="subtitle">{result.action}</p>
          <div className="chip-row" style={{ marginTop: 12 }}>
            <Chip
              type="radio"
              name="suggestion-valid"
              label={suggestion.confirmValid}
              checked={valid}
              onChange={() => onValidChange(true)}
            />
            <Chip
              type="radio"
              name="suggestion-valid"
              label={suggestion.confirmInvalid}
              checked={!valid}
              onChange={() => onValidChange(false)}
            />
          </div>
        </div>
      </div>
      <div
        className="sad-persons-list"
        style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {result.items.map((item) => (
          <div key={item.key}>
            <Chip
              label={item.label}
              checked={item.scored}
              onChange={(checked) => onToggle(item.key, checked)}
            />
            <span className="subtitle" style={{ display: 'block', fontSize: 12, marginTop: 2 }}>
              {[
                SOURCE_LABEL[item.source],
                item.overridden ? suggestion.overriddenTag : null,
                item.note,
              ]
                .filter(Boolean)
                .join(' · ')}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default SuggestionCard
