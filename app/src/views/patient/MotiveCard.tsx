import Card, { SectionHead } from '../../components/Card'
import Field from '../../components/Field'
import { FIELD_MAX_LENGTH, TEXT } from '../../text'
import { invalidClass, isValidText } from '../../utils/validation'
import type { MotiveExpectations } from '../../types'

interface MotiveCardProps {
  value: MotiveExpectations
  onChange: (value: MotiveExpectations) => void
  showErrors: boolean
}

function MotiveCard({ value, onChange, showErrors }: MotiveCardProps) {
  const set = (patch: Partial<MotiveExpectations>) => onChange({ ...value, ...patch })

  return (
    <Card span={8}>
      <SectionHead title={TEXT.patient.motive.title} subtitle={TEXT.patient.motive.subtitle} />
      <div className="field-grid">
        <Field label={TEXT.patient.motive.fields.mainReason}>
          <textarea
            className={invalidClass(showErrors, isValidText(value.mainReason))}
            maxLength={FIELD_MAX_LENGTH.motive}
            value={value.mainReason}
            onChange={(e) => set({ mainReason: e.target.value })}
          />
        </Field>
        <Field label={TEXT.patient.motive.fields.since}>
          <textarea
            className={invalidClass(showErrors, isValidText(value.since))}
            maxLength={FIELD_MAX_LENGTH.motive}
            value={value.since}
            onChange={(e) => set({ since: e.target.value })}
          />
        </Field>
        <Field label={TEXT.patient.motive.fields.expectations}>
          <textarea
            className={invalidClass(showErrors, isValidText(value.expectations))}
            maxLength={FIELD_MAX_LENGTH.motive}
            value={value.expectations}
            onChange={(e) => set({ expectations: e.target.value })}
          />
        </Field>
        <Field label={TEXT.patient.motive.fields.psychiatryFears}>
          <textarea
            className={invalidClass(showErrors, isValidText(value.psychiatryFears))}
            maxLength={FIELD_MAX_LENGTH.motive}
            value={value.psychiatryFears}
            onChange={(e) => set({ psychiatryFears: e.target.value })}
          />
        </Field>
        <Field label={TEXT.patient.motive.fields.additionalInfo} fullWidth>
          <textarea
            className={invalidClass(showErrors, isValidText(value.additionalInfo))}
            maxLength={FIELD_MAX_LENGTH.motive}
            value={value.additionalInfo}
            onChange={(e) => set({ additionalInfo: e.target.value })}
          />
        </Field>
      </div>
    </Card>
  )
}

export default MotiveCard
