import Field from '../../components/Field'
import RangeWithScore from '../../components/RangeWithScore'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { COURSE_OPTIONS, SYMPTOM_OPTIONS } from '../../data/seed'
import { patchAt, removeAt } from '../../utils/list'
import { invalidClass, isFilled } from '../../utils/validation'
import type { Symptom, SymptomCourse } from '../../types'

interface SymptomsCardProps {
  value: Symptom[]
  onChange: (value: Symptom[]) => void
  showErrors: boolean
}

function SymptomsCard({ value, onChange, showErrors }: SymptomsCardProps) {
  const addSymptom = (name?: string) => {
    if (!name) return
    onChange([...value, { name, intensity: 5, onset: '', course: 'Constante', observation: '' }])
  }

  return (
    <RepeatableSection
      span="full"
      title="Síntomas actuales"
      subtitle="Todos los campos son obligatorios."
      addLabel="Agregar síntoma"
      pickFrom={{ label: 'Síntoma', options: SYMPTOM_OPTIONS, otherOption: 'Otros síntomas' }}
      onAdd={addSymptom}
      isEmpty={value.length === 0}
    >
      {value.map((symptom, index) => (
        <RepeatableItem
          key={index}
          header={
            <>
              Síntoma: <strong>{symptom.name}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid three">
            <Field label="Intensidad">
              <RangeWithScore
                value={symptom.intensity}
                onChange={(intensity) => onChange(patchAt(value, index, { intensity }))}
              />
            </Field>
            <Field label="Inicio">
              <input
                className={invalidClass(showErrors, isFilled(symptom.onset))}
                type="month"
                value={symptom.onset}
                onChange={(e) => onChange(patchAt(value, index, { onset: e.target.value }))}
              />
            </Field>
            <Field label="Curso">
              <select
                value={symptom.course}
                onChange={(e) =>
                  onChange(patchAt(value, index, { course: e.target.value as SymptomCourse }))
                }
              >
                {COURSE_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label="Observación (opcional)" fullWidth>
              <input
                value={symptom.observation}
                onChange={(e) => onChange(patchAt(value, index, { observation: e.target.value }))}
              />
            </Field>
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default SymptomsCard
