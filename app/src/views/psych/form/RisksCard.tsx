import Field from '../../../components/Field'
import RepeatableItem from '../../../components/RepeatableItem'
import RepeatableSection from '../../../components/RepeatableSection'
import { RISK_LEVEL_OPTIONS, RISK_PRESENCE_OPTIONS } from '../../../data/seed'
import { patchAt, removeAt } from '../../../utils/list'
import type { ClinicalRisk, RiskLevel, RiskPresence } from '../../../types'

interface RisksCardProps {
  value: ClinicalRisk[]
  onChange: (value: ClinicalRisk[]) => void
}

function RisksCard({ value, onChange }: RisksCardProps) {
  const addRisk = () => {
    const nextId = value.reduce((max, risk) => Math.max(max, risk.id), 0) + 1
    onChange([
      ...value,
      { id: nextId, risk: 'Nuevo riesgo clínico', presence: 'Presente', level: 'Bajo' },
    ])
  }

  return (
    <RepeatableSection
      span={6}
      title="Riesgos clínicos"
      addLabel="Añadir riesgo clínico"
      onAdd={addRisk}
      isEmpty={value.length === 0}
    >
      {value.map((risk, index) => (
        <RepeatableItem
          key={risk.id}
          header={
            <>
              Riesgo: <strong>{risk.risk}</strong>
            </>
          }
          onRemove={() => onChange(removeAt(value, index))}
        >
          <div className="field-grid">
            <Field label="Presente o antecedente">
              <select
                value={risk.presence}
                onChange={(e) =>
                  onChange(patchAt(value, index, { presence: e.target.value as RiskPresence }))
                }
              >
                {RISK_PRESENCE_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label="Nivel">
              <select
                value={risk.level}
                onChange={(e) =>
                  onChange(patchAt(value, index, { level: e.target.value as RiskLevel }))
                }
              >
                {RISK_LEVEL_OPTIONS.map((option) => (
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

export default RisksCard
