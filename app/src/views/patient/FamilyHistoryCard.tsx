import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { FAMILY_CONDITION_OPTIONS, FAMILY_HISTORY_TYPE_OPTIONS } from '../../data/seed'
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
      title="Antecedentes familiares"
      subtitle="Todos los campos son obligatorios."
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
                className={invalidClass(showErrors, isValidText(entry.relationship))}
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
            <Field label="Observación (opcional)">
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
