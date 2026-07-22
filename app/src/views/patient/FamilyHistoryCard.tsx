import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { FAMILY_CONDITION_OPTIONS, FAMILY_HISTORY_TYPE_OPTIONS } from '../../data/seed'
import { patchAt, removeAt } from '../../utils/list'
import type { FamilyHistory, FamilyHistoryType } from '../../types'

interface FamilyHistoryCardProps {
  value: FamilyHistory[]
  onChange: (value: FamilyHistory[]) => void
}

function FamilyHistoryCard({ value, onChange }: FamilyHistoryCardProps) {
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
      title="Antecedentes familiares"
      subtitle="Una o más personas por antecedente."
      addLabel="Agregar antecedente"
      pickFrom={{ label: 'Condición', options: FAMILY_CONDITION_OPTIONS, otherOption: 'Otro' }}
      onAdd={addEntry}
      isEmpty={value.length === 0}
    >
      {value.map((entry, index) => (
        <RepeatableItem
          key={index}
          header={
            <>
              Condición: <strong>{entry.condition}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label="Parentesco">
              <input
                value={entry.relationship}
                onChange={(e) => onChange(patchAt(value, index, { relationship: e.target.value }))}
              />
            </Field>
            <Field label="Tipo">
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
            <Field label="Observación">
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
