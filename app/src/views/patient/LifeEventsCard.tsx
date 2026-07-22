import Field from '../../components/Field'
import RepeatableItem from '../../components/RepeatableItem'
import RepeatableSection from '../../components/RepeatableSection'
import { DATE_PRECISION_OPTIONS, LIFE_EVENT_CATEGORY_OPTIONS } from '../../data/seed'
import { patchAt, removeAt } from '../../utils/list'
import { invalidClass, isFilled } from '../../utils/validation'
import type { DatePrecision, LifeEvent } from '../../types'

interface LifeEventsCardProps {
  value: LifeEvent[]
  onChange: (value: LifeEvent[]) => void
  showErrors: boolean
}

function LifeEventsCard({ value, onChange, showErrors }: LifeEventsCardProps) {
  const addEvent = (category?: string) => {
    if (!category) return
    onChange([
      ...value,
      {
        category,
        startPrecision: 'Año',
        startDate: '',
        endPrecision: 'Año',
        endDate: '',
        description: '',
      },
    ])
  }

  return (
    <RepeatableSection
      span={6}
      title="Eventos importantes"
      subtitle="Todos los campos son obligatorios."
      addLabel="Agregar evento"
      pickFrom={{ label: 'Categoría', options: LIFE_EVENT_CATEGORY_OPTIONS, otherOption: 'Otro' }}
      onAdd={addEvent}
      isEmpty={value.length === 0}
    >
      {value.map((event, index) => (
        <RepeatableItem
          key={index}
          header={
            <>
              Evento: <strong>{event.category}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
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
                className={invalidClass(showErrors, isFilled(event.startDate))}
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
                className={invalidClass(showErrors, isFilled(event.endDate))}
                value={event.endDate}
                onChange={(e) => onChange(patchAt(value, index, { endDate: e.target.value }))}
              />
            </Field>
            <Field label="Descripción breve (opcional)" fullWidth>
              <input
                maxLength={50}
                value={event.description}
                onChange={(e) => onChange(patchAt(value, index, { description: e.target.value }))}
              />
            </Field>
          </div>
        </RepeatableItem>
      ))}
    </RepeatableSection>
  )
}

export default LifeEventsCard
