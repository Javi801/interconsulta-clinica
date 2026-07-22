import Card, { SectionHead } from '../../../components/Card'
import Field from '../../../components/Field'
import StatusBadge from '../../../components/StatusBadge'
import type { ClinicalEvaluation, FormStatus } from '../../../types'

interface EvaluationCardProps {
  value: ClinicalEvaluation
  onChange: (value: ClinicalEvaluation) => void
  status: FormStatus
}

const FIELDS: { key: keyof ClinicalEvaluation; label: string }[] = [
  { key: 'appearance', label: 'Apariencia y presentación' },
  { key: 'behavior', label: 'Conducta observada' },
  { key: 'language', label: 'Lenguaje' },
  { key: 'mood', label: 'Estado de ánimo observado' },
  { key: 'thought', label: 'Curso y contenido del pensamiento' },
  { key: 'judgment', label: 'Juicio' },
]

function EvaluationCard({ value, onChange, status }: EvaluationCardProps) {
  return (
    <Card span={8}>
      <SectionHead title="Evaluación clínica" subtitle="Máximo 100 caracteres por campo.">
        <StatusBadge status={status} />
      </SectionHead>
      <div className="field-grid">
        {FIELDS.map(({ key, label }) => (
          <Field key={key} label={label}>
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
