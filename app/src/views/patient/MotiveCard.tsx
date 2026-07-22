import Card, { SectionHead } from '../../components/Card'
import Field from '../../components/Field'
import type { MotiveExpectations } from '../../types'

interface MotiveCardProps {
  value: MotiveExpectations
  onChange: (value: MotiveExpectations) => void
}

function MotiveCard({ value, onChange }: MotiveCardProps) {
  const set = (patch: Partial<MotiveExpectations>) => onChange({ ...value, ...patch })

  return (
    <Card span={8}>
      <SectionHead title="Motivo y expectativas" subtitle="Máximo 200 caracteres por campo." />
      <div className="field-grid">
        <Field label="Motivo principal de consulta">
          <textarea
            maxLength={200}
            value={value.mainReason}
            onChange={(e) => set({ mainReason: e.target.value })}
          />
        </Field>
        <Field label="Desde cuándo ocurre">
          <textarea
            maxLength={200}
            value={value.since}
            onChange={(e) => set({ since: e.target.value })}
          />
        </Field>
        <Field label="Qué espera obtener de la atención psiquiátrica">
          <textarea
            maxLength={200}
            value={value.expectations}
            onChange={(e) => set({ expectations: e.target.value })}
          />
        </Field>
        <Field label="Temores o dudas sobre atención psiquiátrica">
          <textarea
            maxLength={200}
            value={value.psychiatryFears}
            onChange={(e) => set({ psychiatryFears: e.target.value })}
          />
        </Field>
        <Field label="Información adicional importante" fullWidth>
          <textarea
            maxLength={200}
            value={value.additionalInfo}
            onChange={(e) => set({ additionalInfo: e.target.value })}
          />
        </Field>
      </div>
    </Card>
  )
}

export default MotiveCard
