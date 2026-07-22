import Card, { SectionHead } from '../../components/Card'
import Chip from '../../components/Chip'
import Field from '../../components/Field'
import StatusBadge from '../../components/StatusBadge'
import { GENDER_OPTIONS, OCCUPATION_OPTIONS } from '../../data/seed'
import { formatRut, isValidRut } from '../../utils/rut'
import type { FormStatus, GeneralData } from '../../types'

interface GeneralDataCardProps {
  value: GeneralData
  onChange: (value: GeneralData) => void
  status: FormStatus
}

function GeneralDataCard({ value, onChange, status }: GeneralDataCardProps) {
  const set = (patch: Partial<GeneralData>) => onChange({ ...value, ...patch })

  const toggleOccupation = (occupation: string, checked: boolean) =>
    set({
      occupations: checked
        ? [...value.occupations, occupation]
        : value.occupations.filter((o) => o !== occupation),
    })

  return (
    <Card span="full">
      <SectionHead
        title="Datos generales"
        subtitle="Información básica de identificación y contexto."
      >
        <StatusBadge status={status} />
      </SectionHead>
      <div className="field-grid three">
        <Field label="RUT">
          <input
            className={value.rut !== '' && !isValidRut(value.rut) ? 'invalid' : undefined}
            inputMode="numeric"
            value={value.rut}
            onChange={(e) => set({ rut: formatRut(e.target.value) })}
          />
        </Field>
        <Field label="Nombres">
          <input value={value.firstName} onChange={(e) => set({ firstName: e.target.value })} />
        </Field>
        <Field label="Apellidos">
          <input value={value.lastName} onChange={(e) => set({ lastName: e.target.value })} />
        </Field>
        <Field label="Fecha de nacimiento">
          <input
            type="date"
            value={value.birthDate}
            onChange={(e) => set({ birthDate: e.target.value })}
          />
        </Field>
        <Field label="Género">
          <select value={value.gender} onChange={(e) => set({ gender: e.target.value })}>
            {GENDER_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field label="Nacionalidad">
          <input
            value={value.nationality}
            onChange={(e) => set({ nationality: e.target.value })}
          />
        </Field>
        <Field label="Con quién vive">
          <input value={value.livesWith} onChange={(e) => set({ livesWith: e.target.value })} />
        </Field>
        <Field label="Situación de pareja">
          <input
            value={value.relationshipStatus}
            onChange={(e) => set({ relationshipStatus: e.target.value })}
          />
        </Field>
        <Field label="Correo">
          <input
            type="email"
            value={value.email}
            onChange={(e) => set({ email: e.target.value })}
          />
        </Field>
      </div>
      <div style={{ marginTop: 16 }}>
        <label>Ocupaciones o actividades</label>
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
        <Field label="Detalle de ocupación o situación laboral">
          <input
            value={value.occupationDetail}
            onChange={(e) => set({ occupationDetail: e.target.value })}
          />
        </Field>
      </div>
    </Card>
  )
}

export default GeneralDataCard
