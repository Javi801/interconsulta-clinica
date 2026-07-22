import Field from '../../components/Field'
import RangeWithScore from '../../components/RangeWithScore'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { COURSE_OPTIONS, SYMPTOM_OPTIONS } from '../../data/seed'
import { patchAt, removeAt } from '../../utils/list'
import type { Symptom, SymptomCourse } from '../../types'

interface SymptomsCardProps {
  value: Symptom[]
  onChange: (value: Symptom[]) => void
}

function SymptomsCard({ value, onChange }: SymptomsCardProps) {
  const addSymptom = (name?: string) => {
    if (!name) return
    onChange([...value, { name, intensity: 5, onset: '', course: 'Constante' }])
  }

  return (
    <RepeatableSection
      span="full"
      title="Síntomas actuales"
      subtitle="Selecciona intensidad, inicio y curso."
      addLabel="Agregar síntoma"
      pickFrom={{ label: 'Síntoma', options: SYMPTOM_OPTIONS, otherOption: 'Otro' }}
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
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default SymptomsCard
