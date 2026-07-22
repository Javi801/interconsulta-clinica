import Field from '../../../components/Field'
import RepeatableItem from '../../../components/RepeatableItem'
import RepeatableSection from '../../../components/RepeatableSection'
import { HYPOTHESIS_OPTIONS, HYPOTHESIS_PRIORITY_OPTIONS } from '../../../data/seed'
import { patchAt, removeAt } from '../../../utils/list'
import type { ClinicalHypothesis, ClinicalPriority } from '../../../types'

interface HypothesesCardProps {
  value: ClinicalHypothesis[]
  onChange: (value: ClinicalHypothesis[]) => void
}

function HypothesesCard({ value, onChange }: HypothesesCardProps) {
  const addHypothesis = (name?: string) => {
    if (!name) return
    onChange([...value, { hypothesis: name, priority: 'Media', comment: '' }])
  }

  return (
    <RepeatableSection
      span={4}
      title="Hipótesis clínicas"
      addLabel="Agregar hipótesis"
      pickFrom={{ label: 'Hipótesis', options: HYPOTHESIS_OPTIONS, otherOption: '' }}
      onAdd={addHypothesis}
      isEmpty={value.length === 0}
    >
      {value.map((entry, index) => (
        <RepeatableItem
          key={index}
          header={
            <>
              Hipótesis: <strong>{entry.hypothesis}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label="Prioridad clínica">
              <select
                value={entry.priority}
                onChange={(e) =>
                  onChange(patchAt(value, index, { priority: e.target.value as ClinicalPriority }))
                }
              >
                {HYPOTHESIS_PRIORITY_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label="Comentario (opcional)">
              <input
                value={entry.comment}
                onChange={(e) => onChange(patchAt(value, index, { comment: e.target.value }))}
              />
            </Field>
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default HypothesesCard
