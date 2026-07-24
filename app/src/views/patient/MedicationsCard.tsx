import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import {
  ADHERENCE_OPTIONS,
  HEALTH_PROFESSIONAL_OPTIONS,
  MEDICATION_FREQUENCY_OPTIONS,
  MEDICATION_STATUS_OPTIONS,
  TEXT,
} from '../../text'
import { patchAt, removeAt, setAt } from '../../utils/list'
import { invalidClass, isFilled } from '../../utils/validation'
import type {
  Adherence,
  ConditionRef,
  HistorySource,
  Medication,
  MedicationFrequency,
  MedicationStatus,
  MentalHistory,
  PhysicalHistory,
} from '../../types'

interface MedicationsCardProps {
  value: Medication[]
  onChange: (value: Medication[]) => void
  mentalHistory: MentalHistory[]
  physicalHistory: PhysicalHistory[]
  showErrors: boolean
}

const refKey = (ref: ConditionRef | null): string => (ref ? `${ref.source}-${ref.id}` : '')

const parseRef = (key: string): ConditionRef | null => {
  if (!key) return null
  const [source, id] = key.split('-')
  return { source: source as HistorySource, id: Number(id) }
}

function MedicationsCard({
  value,
  onChange,
  mentalHistory,
  physicalHistory,
  showErrors,
}: MedicationsCardProps) {
  const conditionOptions = [
    ...mentalHistory.map((entry) => ({
      key: `mental-${entry.id}`,
      label: `${entry.condition} (salud mental)`,
    })),
    ...physicalHistory.map((entry) => ({
      key: `physical-${entry.id}`,
      label: `${entry.condition} (salud física)`,
    })),
  ]

  const addMedication = () => {
    const nextId = value.reduce((max, medication) => Math.max(max, medication.id), 0) + 1
    onChange([
      ...value,
      {
        id: nextId,
        name: '',
        status: 'Actual',
        linkedCondition: null,
        dose: '',
        frequency: 'Una vez al día',
        frequencyDetail: '',
        times: [],
        period: '',
        prescribedBy: 'No sé / No recuerdo',
        adherence: 'Alta',
      },
    ])
  }

  const patchTimes = (index: number, times: string[]) =>
    onChange(patchAt(value, index, { times }))

  return (
    <RepeatableSection
      span={6}
      title={TEXT.patient.medications.title}
      subtitle={TEXT.patient.medications.subtitle}
      addLabel={TEXT.patient.medications.addLabel}
      onAdd={addMedication}
      isEmpty={value.length === 0}
    >
      {value.map((medication, index) => (
        <RepeatableItem
          key={medication.id}
          header={
            <>
              {TEXT.patient.medications.itemLabel}:{' '}
              <strong>{medication.name || `#${index + 1}`}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label={TEXT.patient.medications.fields.name}>
              <input
                className={invalidClass(showErrors, isFilled(medication.name))}
                value={medication.name}
                onChange={(e) => onChange(patchAt(value, index, { name: e.target.value }))}
              />
            </Field>
            <Field label={TEXT.patient.medications.fields.status}>
              <select
                value={medication.status}
                onChange={(e) =>
                  onChange(patchAt(value, index, { status: e.target.value as MedicationStatus }))
                }
              >
                {MEDICATION_STATUS_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label={TEXT.patient.medications.fields.forCondition}>
              <select
                value={refKey(medication.linkedCondition)}
                onChange={(e) =>
                  onChange(patchAt(value, index, { linkedCondition: parseRef(e.target.value) }))
                }
              >
                <option value="">{TEXT.patient.medications.linkNone}</option>
                {conditionOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={TEXT.patient.medications.fields.prescribedBy}>
              <select
                value={medication.prescribedBy}
                onChange={(e) => onChange(patchAt(value, index, { prescribedBy: e.target.value }))}
              >
                {HEALTH_PROFESSIONAL_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            {medication.status === 'Pasado' ? (
              <Field label={TEXT.patient.medications.fields.period}>
                <input
                  value={medication.period}
                  onChange={(e) => onChange(patchAt(value, index, { period: e.target.value }))}
                />
              </Field>
            ) : (
              <>
                <Field label={TEXT.patient.medications.fields.dose}>
                  <input
                    value={medication.dose}
                    onChange={(e) => onChange(patchAt(value, index, { dose: e.target.value }))}
                  />
                </Field>
                <Field label={TEXT.patient.medications.fields.frequency}>
                  <select
                    value={medication.frequency}
                    onChange={(e) =>
                      onChange(
                        patchAt(value, index, {
                          frequency: e.target.value as MedicationFrequency,
                          frequencyDetail: '',
                        }),
                      )
                    }
                  >
                    {MEDICATION_FREQUENCY_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
                {medication.frequency === 'Otro' && (
                  <Field label={TEXT.patient.medications.fields.frequencyDetail}>
                    <input
                      className={invalidClass(showErrors, isFilled(medication.frequencyDetail))}
                      value={medication.frequencyDetail}
                      onChange={(e) =>
                        onChange(patchAt(value, index, { frequencyDetail: e.target.value }))
                      }
                    />
                  </Field>
                )}
                <Field label={TEXT.patient.medications.fields.adherence}>
                  <select
                    value={medication.adherence}
                    onChange={(e) =>
                      onChange(patchAt(value, index, { adherence: e.target.value as Adherence }))
                    }
                  >
                    {ADHERENCE_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
                <Field label={TEXT.patient.medications.fields.times} fullWidth>
                  <div className="time-list">
                    {medication.times.map((time, timeIndex) => (
                      <div key={timeIndex} className="time-row">
                        <input
                          className={invalidClass(showErrors, isFilled(time))}
                          type="time"
                          value={time}
                          onChange={(e) =>
                            patchTimes(index, setAt(medication.times, timeIndex, e.target.value))
                          }
                        />
                        <button
                          type="button"
                          className="btn"
                          onClick={() => patchTimes(index, removeAt(medication.times, timeIndex))}
                        >
                          {TEXT.common.remove}
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => patchTimes(index, [...medication.times, ''])}
                    >
                      {TEXT.patient.medications.addTime}
                    </button>
                  </div>
                </Field>
              </>
            )}
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default MedicationsCard
