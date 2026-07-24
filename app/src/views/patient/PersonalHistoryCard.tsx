import type { ReactNode } from 'react'
import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { DIAGNOSIS_ORIGIN_OPTIONS, HEALTH_PROFESSIONAL_OPTIONS } from '../../text'
import { patchAt, removeAt } from '../../utils/list'
import type { DiagnosisOrigin, PersonalHistoryBase } from '../../types'

interface PersonalHistoryCopy {
  title: string
  subtitle: string
  addLabel: string
  pickLabel: string
  otherOption: string
  itemLabel: string
  fields: {
    origin: string
    diagnosisDate: string
    diagnosedBy: string
    observation: string
  }
}

interface PersonalHistoryCardProps<T extends PersonalHistoryBase> {
  copy: PersonalHistoryCopy
  options: string[]
  value: T[]
  onChange: (value: T[]) => void
  createEntry: (id: number, condition: string) => T
  /** Extra fields rendered before the observation (e.g. the severity flag). */
  renderExtra?: (entry: T, patch: (patch: Partial<T>) => void) => ReactNode
}

function PersonalHistoryCard<T extends PersonalHistoryBase>({
  copy,
  options,
  value,
  onChange,
  createEntry,
  renderExtra,
}: PersonalHistoryCardProps<T>) {
  const addEntry = (condition?: string) => {
    if (!condition) return
    const nextId = value.reduce((max, entry) => Math.max(max, entry.id), 0) + 1
    onChange([...value, createEntry(nextId, condition)])
  }

  return (
    <RepeatableSection
      span={6}
      title={copy.title}
      subtitle={copy.subtitle}
      addLabel={copy.addLabel}
      pickFrom={{ label: copy.pickLabel, options, otherOption: copy.otherOption }}
      onAdd={addEntry}
      isEmpty={value.length === 0}
    >
      {value.map((entry, index) => {
        const patch = (partial: Partial<T>) => onChange(patchAt(value, index, partial))
        return (
          <RepeatableItem
            key={entry.id}
            header={
              <>
                {copy.itemLabel}: <strong>{entry.condition}</strong>
              </>
            }
            onRemove={() => onChange(removeAt(value, index))}
          >
            <div className="field-grid">
              <Field label={copy.fields.origin}>
                <select
                  value={entry.origin}
                  onChange={(e) => patch({ origin: e.target.value as DiagnosisOrigin } as Partial<T>)}
                >
                  {DIAGNOSIS_ORIGIN_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              {entry.origin === 'Diagnóstico médico' && (
                <>
                  <Field label={copy.fields.diagnosisDate}>
                    <input
                      type="month"
                      value={entry.diagnosisDate}
                      onChange={(e) => patch({ diagnosisDate: e.target.value } as Partial<T>)}
                    />
                  </Field>
                  <Field label={copy.fields.diagnosedBy}>
                    <select
                      value={entry.diagnosedBy}
                      onChange={(e) => patch({ diagnosedBy: e.target.value } as Partial<T>)}
                    >
                      {HEALTH_PROFESSIONAL_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                </>
              )}
              {renderExtra?.(entry, patch)}
              <Field label={copy.fields.observation} fullWidth>
                <input
                  value={entry.observation}
                  onChange={(e) => patch({ observation: e.target.value } as Partial<T>)}
                />
              </Field>
            </div>
          </RepeatableItem>
        )
      })}
    </RepeatableSection>
  )
}

export default PersonalHistoryCard
