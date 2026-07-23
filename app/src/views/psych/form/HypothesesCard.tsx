import Field from '../../../components/Field'
import RepeatableItem from '../../../components/RepeatableItem'
import RepeatableSection from '../../../components/RepeatableSection'
import { HYPOTHESIS_OPTIONS, HYPOTHESIS_PRIORITY_OPTIONS, TEXT } from '../../../text'
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
      title={TEXT.psych.hypotheses.title}
      addLabel={TEXT.psych.hypotheses.addLabel}
      pickFrom={{
        label: TEXT.psych.hypotheses.pickLabel,
        options: HYPOTHESIS_OPTIONS,
        otherOption: TEXT.psych.hypotheses.otherOption,
      }}
      onAdd={addHypothesis}
      isEmpty={value.length === 0}
    >
      {value.map((entry, index) => (
        <RepeatableItem
          key={index}
          header={
            <>
              {TEXT.psych.hypotheses.itemLabel}: <strong>{entry.hypothesis}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label={TEXT.psych.hypotheses.fields.priority}>
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
            <Field label={TEXT.psych.hypotheses.fields.comment}>
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
