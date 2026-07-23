import Card, { SectionHead } from '../../../components/Card'
import Field from '../../../components/Field'
import StatusBadge from '../../../components/StatusBadge'
import { TEXT } from '../../../text'
import type { ClinicalEvaluation, FormStatus } from '../../../types'

interface EvaluationCardProps {
  value: ClinicalEvaluation
  onChange: (value: ClinicalEvaluation) => void
  status: FormStatus
}

const FIELD_KEYS: (keyof ClinicalEvaluation)[] = [
  'appearance',
  'behavior',
  'attitude',
  'language',
  'mood',
  'affect',
  'thought',
  'perception',
  'orientation',
  'attention',
  'memory',
  'judgment',
  'insight',
  'additionalObservations',
]

function EvaluationCard({ value, onChange, status }: EvaluationCardProps) {
  return (
    <Card span={8}>
      <SectionHead title={TEXT.psych.evaluation.title} subtitle={TEXT.psych.evaluation.subtitle}>
        <StatusBadge status={status} />
      </SectionHead>
      <div className="field-grid">
        {FIELD_KEYS.map((key) => (
          <Field key={key} label={TEXT.psych.evaluation.fields[key]}>
            <input
              maxLength={100}
              value={value[key]}
              onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            />
          </Field>
        ))}
      </div>
    </Card>
  )
}

export default EvaluationCard
