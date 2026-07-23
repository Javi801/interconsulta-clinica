import Card, { SectionHead } from '../../components/Card'
import Chip from '../../components/Chip'
import Field from '../../components/Field'
import StatusBadge from '../../components/StatusBadge'
import { GENDER_OPTIONS, OCCUPATION_OPTIONS, TEXT } from '../../text'
import { calculateAge } from '../../utils/date'
import { formatPhone } from '../../utils/phone'
import { formatRut, isValidRut } from '../../utils/rut'
import { invalidClass, isFilled, isValidEmail, isValidText } from '../../utils/validation'
import type { FormStatus, GeneralData } from '../../types'

interface GeneralDataCardProps {
  value: GeneralData
  onChange: (value: GeneralData) => void
  status: FormStatus
  showErrors: boolean
}

function GeneralDataCard({ value, onChange, status, showErrors }: GeneralDataCardProps) {
  const set = (patch: Partial<GeneralData>) => onChange({ ...value, ...patch })
  const age = calculateAge(value.birthDate)

  const toggleOccupation = (occupation: string, checked: boolean) =>
    set({
      occupations: checked
        ? [...value.occupations, occupation]
        : value.occupations.filter((o) => o !== occupation),
    })

  return (
    <Card span="full">
      <SectionHead
        title={TEXT.patient.generalData.title}
        subtitle={TEXT.patient.generalData.subtitle}
      >
        <StatusBadge status={status} />
      </SectionHead>
      <div className="field-grid three">
        <Field label={TEXT.patient.generalData.fields.rut}>
          <input
            className={invalidClass(showErrors || value.rut !== '', isValidRut(value.rut))}
            inputMode="numeric"
            value={value.rut}
            onChange={(e) => set({ rut: formatRut(e.target.value) })}
          />
        </Field>
        <Field label={TEXT.patient.generalData.fields.firstName}>
          <input
            className={invalidClass(showErrors, isValidText(value.firstName))}
            value={value.firstName}
            onChange={(e) => set({ firstName: e.target.value })}
          />
        </Field>
        <Field label={TEXT.patient.generalData.fields.lastName}>
          <input
            className={invalidClass(showErrors, isValidText(value.lastName))}
            value={value.lastName}
            onChange={(e) => set({ lastName: e.target.value })}
          />
        </Field>
        <Field
          label={TEXT.patient.generalData.fields.birthDate}
          counter={age !== null ? TEXT.patient.generalData.ageCounter(age) : undefined}
        >
          <input
            className={invalidClass(showErrors, isFilled(value.birthDate))}
            type="date"
            value={value.birthDate}
            onChange={(e) => set({ birthDate: e.target.value })}
          />
        </Field>
        <Field label={TEXT.patient.generalData.fields.gender}>
          <select value={value.gender} onChange={(e) => set({ gender: e.target.value })}>
            {GENDER_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field label={TEXT.patient.generalData.fields.nationality}>
          <input
            className={invalidClass(showErrors, isValidText(value.nationality))}
            value={value.nationality}
            onChange={(e) => set({ nationality: e.target.value })}
          />
        </Field>
        <Field label={TEXT.patient.generalData.fields.livesWith}>
          <input
            className={invalidClass(showErrors, isValidText(value.livesWith))}
            value={value.livesWith}
            onChange={(e) => set({ livesWith: e.target.value })}
          />
        </Field>
        <Field label={TEXT.patient.generalData.fields.relationshipStatus}>
          <input
            className={invalidClass(showErrors, isValidText(value.relationshipStatus))}
            value={value.relationshipStatus}
            onChange={(e) => set({ relationshipStatus: e.target.value })}
          />
        </Field>
        <Field label={TEXT.patient.generalData.fields.phone}>
          <input
            className={invalidClass(showErrors, isFilled(value.phone))}
            type="tel"
            inputMode="numeric"
            value={value.phone}
            onChange={(e) => set({ phone: formatPhone(e.target.value) })}
          />
        </Field>
        <Field label={TEXT.patient.generalData.fields.email}>
          <input
            className={invalidClass(showErrors, isValidEmail(value.email))}
            type="email"
            value={value.email}
            onChange={(e) => set({ email: e.target.value })}
          />
        </Field>
      </div>
      <div style={{ marginTop: 16 }}>
        <label>{TEXT.patient.generalData.occupationsLabel}</label>
        <div className="chip-row" style={{ marginTop: 8 }}>
          {OCCUPATION_OPTIONS.map((occupation) => (
            <Chip
              key={occupation}
              label={occupation}
              checked={value.occupations.includes(occupation)}
              onChange={(checked) => toggleOccupation(occupation, checked)}
            />
          ))}
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label={TEXT.patient.generalData.occupationDetailLabel}>
          <input
            className={invalidClass(showErrors, isValidText(value.occupationDetail))}
            value={value.occupationDetail}
            onChange={(e) => set({ occupationDetail: e.target.value })}
          />
        </Field>
      </div>
    </Card>
  )
}

export default GeneralDataCard
