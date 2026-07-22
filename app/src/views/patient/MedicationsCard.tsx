import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { ADHERENCE_OPTIONS } from '../../data/seed'
import { patchAt, removeAt } from '../../utils/list'
import type { Adherence, Medication } from '../../types'

interface MedicationsCardProps {
  value: Medication[]
  onChange: (value: Medication[]) => void
}

function MedicationsCard({ value, onChange }: MedicationsCardProps) {
  const addMedication = () =>
    onChange([
      ...value,
      { name: '', dose: '', frequency: '', time: '', prescribedBy: '', adherence: 'Alta' },
    ])

  return (
    <RepeatableSection
      span={6}
      title="Medicamentos actuales"
      subtitle="Sección repetible."
      addLabel="Agregar medicamento"
      onAdd={addMedication}
      isEmpty={value.length === 0}
    >
      {value.map((medication, index) => (
        <RepeatableItem
          key={index}
          header={
            <>
              Medicamento <strong>{index + 1}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label="Nombre">
              <input
                value={medication.name}
                onChange={(e) => onChange(patchAt(value, index, { name: e.target.value }))}
              />
            </Field>
            <Field label="Dosis">
              <input
                value={medication.dose}
                onChange={(e) => onChange(patchAt(value, index, { dose: e.target.value }))}
              />
            </Field>
            <Field label="Frecuencia">
              <input
                value={medication.frequency}
                onChange={(e) => onChange(patchAt(value, index, { frequency: e.target.value }))}
              />
            </Field>
            <Field label="Horario">
              <input
                type="time"
                value={medication.time}
                onChange={(e) => onChange(patchAt(value, index, { time: e.target.value }))}
              />
            </Field>
            <Field label="Profesional que indicó">
              <input
                value={medication.prescribedBy}
                onChange={(e) => onChange(patchAt(value, index, { prescribedBy: e.target.value }))}
              />
            </Field>
            <Field label="Adherencia percibida">
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
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default MedicationsCard
