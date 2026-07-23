import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { FAMILY_CONDITION_OPTIONS, FAMILY_HISTORY_TYPE_OPTIONS, TEXT } from '../../text'
import { patchAt, removeAt } from '../../utils/list'
import { invalidClass, isValidText } from '../../utils/validation'
import type { FamilyHistory, FamilyHistoryType } from '../../types'

interface FamilyHistoryCardProps {
  value: FamilyHistory[]
  onChange: (value: FamilyHistory[]) => void
  showErrors: boolean
}

function FamilyHistoryCard({ value, onChange, showErrors }: FamilyHistoryCardProps) {
  const addEntry = (condition?: string) => {
    if (!condition) return
    onChange([
      ...value,
      { condition, relationship: '', type: 'Diagnóstico confirmado', observation: '' },
    ])
  }

  return (
    <RepeatableSection
      span={6}
      title={TEXT.patient.familyHistory.title}
      subtitle={TEXT.patient.familyHistory.subtitle}
      addLabel={TEXT.patient.familyHistory.addLabel}
      pickFrom={{
        label: TEXT.patient.familyHistory.pickLabel,
        options: FAMILY_CONDITION_OPTIONS,
        otherOption: TEXT.patient.familyHistory.otherOption,
      }}
      onAdd={addEntry}
      isEmpty={value.length === 0}
    >
      {value.map((entry, index) => (
        <RepeatableItem
          key={index}
          header={
            <>
              {TEXT.patient.familyHistory.itemLabel}: <strong>{entry.condition}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label={TEXT.patient.familyHistory.fields.relationship}>
              <input
                className={invalidClass(showErrors, isValidText(entry.relationship))}
                value={entry.relationship}
                onChange={(e) => onChange(patchAt(value, index, { relationship: e.target.value }))}
              />
            </Field>
            <Field label={TEXT.patient.familyHistory.fields.type}>
              <select
                value={entry.type}
                onChange={(e) =>
                  onChange(patchAt(value, index, { type: e.target.value as FamilyHistoryType }))
                }
              >
                {FAMILY_HISTORY_TYPE_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label={TEXT.patient.familyHistory.fields.observation}>
              <input
                value={entry.observation}
                onChange={(e) => onChange(patchAt(value, index, { observation: e.target.value }))}
              />
            </Field>
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default FamilyHistoryCard
