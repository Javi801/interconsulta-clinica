import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { SUBSTANCE_OPTIONS, SUBSTANCE_STATUS_OPTIONS } from '../../data/seed'
import { patchAt, removeAt } from '../../utils/list'
import { invalidClass, isFilled, isValidText } from '../../utils/validation'
import type { SubstanceUse } from '../../types'

interface SubstancesCardProps {
  value: SubstanceUse[]
  onChange: (value: SubstanceUse[]) => void
  showErrors: boolean
}

function SubstancesCard({ value, onChange, showErrors }: SubstancesCardProps) {
  const addSubstance = (name?: string) => {
    if (!name) return
    onChange([
      ...value,
      {
        substance: name,
        status: 'Consumo actual',
        frequency: '',
        usualAmount: '',
        onset: '',
        lastUse: '',
      },
    ])
  }

  return (
    <RepeatableSection
      span={6}
      title="Consumo de sustancias"
      subtitle="Todos los campos son obligatorios."
      addLabel="Agregar sustancia"
      pickFrom={{ label: 'Sustancia', options: SUBSTANCE_OPTIONS, otherOption: 'Otra sustancia' }}
      onAdd={addSubstance}
      isEmpty={value.length === 0}
    >
      {value.map((substance, index) => (
        <RepeatableItem
          key={index}
          header={
            <>
              Sustancia: <strong>{substance.substance}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label="Estado">
              <select
                value={substance.status}
                onChange={(e) => onChange(patchAt(value, index, { status: e.target.value }))}
              >
                {SUBSTANCE_STATUS_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label="Frecuencia">
              <input
                className={invalidClass(showErrors, isValidText(substance.frequency))}
                value={substance.frequency}
                onChange={(e) => onChange(patchAt(value, index, { frequency: e.target.value }))}
              />
            </Field>
            <Field label="Cantidad habitual">
              <input
                className={invalidClass(showErrors, isValidText(substance.usualAmount))}
                value={substance.usualAmount}
                onChange={(e) => onChange(patchAt(value, index, { usualAmount: e.target.value }))}
              />
            </Field>
            <Field label="Inicio aproximado">
              <input
                className={invalidClass(showErrors, isFilled(substance.onset))}
                type="month"
                value={substance.onset}
                onChange={(e) => onChange(patchAt(value, index, { onset: e.target.value }))}
              />
            </Field>
            <Field label="Último consumo">
              <input
                className={invalidClass(showErrors, isFilled(substance.lastUse))}
                type="date"
                value={substance.lastUse}
                onChange={(e) => onChange(patchAt(value, index, { lastUse: e.target.value }))}
              />
            </Field>
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default SubstancesCard
