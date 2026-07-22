import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { DATE_PRECISION_OPTIONS } from '../../data/seed'
import { patchAt, removeAt } from '../../utils/list'
import type { DatePrecision, LifeEvent } from '../../types'

interface LifeEventsCardProps {
  value: LifeEvent[]
  onChange: (value: LifeEvent[]) => void
}

function LifeEventsCard({ value, onChange }: LifeEventsCardProps) {
  const addEvent = () =>
    onChange([
      ...value,
      { startPrecision: 'Año', startDate: '', endPrecision: 'Año', endDate: '', description: '' },
    ])

  return (
    <RepeatableSection
      span={6}
      title="Eventos importantes"
      subtitle="Fecha inicial y final obligatorias."
      addLabel="Agregar evento"
      onAdd={addEvent}
      isEmpty={value.length === 0}
    >
      {value.map((event, index) => (
        <RepeatableItem
          key={index}
          header={
            <>
              Evento <strong>{index + 1}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label="Descripción breve" fullWidth>
              <input
                maxLength={50}
                value={event.description}
                onChange={(e) => onChange(patchAt(value, index, { description: e.target.value }))}
              />
            </Field>
            <Field label="Precisión inicio">
              <select
                value={event.startPrecision}
                onChange={(e) =>
                  onChange(patchAt(value, index, { startPrecision: e.target.value as DatePrecision }))
                }
              >
                {DATE_PRECISION_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label="Fecha inicial">
              <input
                value={event.startDate}
                onChange={(e) => onChange(patchAt(value, index, { startDate: e.target.value }))}
              />
            </Field>
            <Field label="Precisión término">
              <select
                value={event.endPrecision}
                onChange={(e) =>
                  onChange(patchAt(value, index, { endPrecision: e.target.value as DatePrecision }))
                }
              >
                {DATE_PRECISION_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label="Fecha final">
              <input
                value={event.endDate}
                onChange={(e) => onChange(patchAt(value, index, { endDate: e.target.value }))}
              />
            </Field>
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default LifeEventsCard
