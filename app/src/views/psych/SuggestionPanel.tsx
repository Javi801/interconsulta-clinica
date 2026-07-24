import Card, { SectionHead } from '../../components/Card'
import { TEXT } from '../../text'
import type { GrayZoneGroup, SadPersonsResult, SadPersonsSource } from '../../utils/sadPersons'

interface SuggestionPanelProps {
  result: SadPersonsResult
  grayZone: GrayZoneGroup[]
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

function SuggestionPanel({ result, grayZone }: SuggestionPanelProps) {
  const bandColor = BAND_COLOR[result.band]
  const recommendation = result.derive
    ? suggestion.recommendation.derive
    : suggestion.recommendation.notDerive

  return (
    <Card span="full">
      <SectionHead title={suggestion.title} subtitle={suggestion.subtitle} />
      <div className="score-panel">
        <div className="score-circle" style={{ background: bandColor, color: '#fff' }}>
          {result.score}
        </div>
        <div>
          <h3 style={{ color: bandColor }}>{recommendation}</h3>
          <p className="subtitle">
            {suggestion.scoreLabel(result.score, result.maxScore, result.band)} · {result.action}
          </p>
        </div>
      </div>

      <div className="considered">
        <h4>{suggestion.consideredTitle}</h4>
        <p className="subtitle">{suggestion.weightNote}</p>
        <ul className="considered-list">
          {result.items.map((item) => (
            <li key={item.key} className={item.scored ? 'scored' : 'not-scored'}>
              <span className="considered-label">{item.label}</span>
              <span className="considered-meta">
                {[SOURCE_LABEL[item.source], item.note].filter(Boolean).join(' · ')}
              </span>
              <span className="considered-weight">
                {item.scored ? suggestion.scoredTag : suggestion.notScoredTag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="gray-zone">
        <h4>{suggestion.grayZone.title}</h4>
        <p className="subtitle">{suggestion.grayZone.subtitle}</p>
        {grayZone.length === 0 ? (
          <p className="subtitle">{suggestion.grayZone.empty}</p>
        ) : (
          grayZone.map((group) => (
            <div key={group.key} className="gray-zone-group">
              <h5>{group.title}</h5>
              <ul>
                {group.entries.map((entry, index) => (
                  <li key={index}>{entry}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

export default SuggestionPanel
