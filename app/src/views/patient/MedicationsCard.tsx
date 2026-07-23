import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { ADHERENCE_OPTIONS, MEDICATION_FREQUENCY_OPTIONS, TEXT } from '../../text'
import { patchAt, removeAt, setAt } from '../../utils/list'
import { invalidClass, isFilled, isValidText } from '../../utils/validation'
import type { Adherence, Medication, MedicationFrequency } from '../../types'

interface MedicationsCardProps {
  value: Medication[]
  onChange: (value: Medication[]) => void
  showErrors: boolean
}

function MedicationsCard({ value, onChange, showErrors }: MedicationsCardProps) {
  const addMedication = () =>
    onChange([
      ...value,
      {
        name: '',
        dose: '',
        frequency: 'Una vez al día',
        frequencyDetail: '',
        times: [],
        prescribedBy: '',
        adherence: 'Alta',
      },
    ])

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
          key={index}
          header={
            <>
              {TEXT.patient.medications.itemLabel} <strong>{index + 1}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label={TEXT.patient.medications.fields.name}>
              <input
                className={invalidClass(showErrors, isValidText(medication.name))}
                value={medication.name}
                onChange={(e) => onChange(patchAt(value, index, { name: e.target.value }))}
              />
            </Field>
            <Field label={TEXT.patient.medications.fields.dose}>
              <input
                className={invalidClass(showErrors, isValidText(medication.dose))}
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
                  className={invalidClass(showErrors, isValidText(medication.frequencyDetail))}
                  value={medication.frequencyDetail}
                  onChange={(e) =>
                    onChange(patchAt(value, index, { frequencyDetail: e.target.value }))
                  }
                />
              </Field>
            )}
            <Field label={TEXT.patient.medications.fields.prescribedBy}>
              <input
                className={invalidClass(showErrors, isValidText(medication.prescribedBy))}
                value={medication.prescribedBy}
                onChange={(e) => onChange(patchAt(value, index, { prescribedBy: e.target.value }))}
              />
            </Field>
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
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default MedicationsCard
