import { useState } from 'react'
import Field from '../../components/Field'
import { ACCESS_CODE } from '../../seed/demoData'
import { TEXT } from '../../text'
import { formatRut, isValidRut } from '../../utils/rut'
import { invalidClass } from '../../utils/validation'

interface PatientAccessProps {
  onEnter: (rut: string) => void
}

const normalizeCode = (value: string): string => value.replace(/\s+/g, '')

function PatientAccess({ onEnter }: PatientAccessProps) {
  const [code, setCode] = useState('')
  const [rut, setRut] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const codeValid = normalizeCode(code) === normalizeCode(ACCESS_CODE)
  const rutValid = isValidRut(rut)

  const handleEnter = () => {
    setSubmitted(true)
    if (!codeValid) {
      setError(TEXT.patient.access.errors.code)
      return
    }
    if (!rutValid) {
      setError(TEXT.patient.access.errors.rut)
      return
    }
    setError(null)
    onEnter(rut)
  }

  const useLink = () => {
    setCode(ACCESS_CODE)
    setError(null)
  }

  return (
    <div style={{ maxWidth: 440, margin: '40px auto 0' }}>
      <div className="card">
        <h1 style={{ fontSize: 24 }}>{TEXT.patient.access.title}</h1>
        <p className="subtitle" style={{ marginBottom: 20 }}>
          {TEXT.patient.access.subtitle}
        </p>
        <div className="field-grid" style={{ gridTemplateColumns: '1fr' }}>
          <Field label={TEXT.patient.access.fields.code}>
            <input
              className={invalidClass(submitted, codeValid)}
              value={code}
              placeholder={TEXT.patient.access.codePlaceholder(ACCESS_CODE)}
              onChange={(e) => setCode(e.target.value)}
            />
          </Field>
          <Field label={TEXT.patient.access.fields.rut}>
            <input
              className={invalidClass(submitted, rutValid)}
              inputMode="numeric"
              value={rut}
              onChange={(e) => setRut(formatRut(e.target.value))}
            />
          </Field>
        </div>
        {error && (
          <div
            className="notice"
            style={{ background: 'var(--danger-bg)', color: 'var(--danger)', marginTop: 16 }}
          >
            {error}
          </div>
        )}
        <button
          type="button"
          className="btn primary"
          style={{ width: '100%', marginTop: 18 }}
          onClick={handleEnter}
        >
          {TEXT.patient.access.enter}
        </button>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: 'var(--muted)',
            fontSize: 13,
            margin: '18px 0',
          }}
        >
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          {TEXT.patient.access.or}
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>
        <button type="button" className="btn" style={{ width: '100%' }} onClick={useLink}>
          {TEXT.patient.access.useLink}
        </button>
        <p className="help" style={{ marginTop: 10 }}>
          {TEXT.patient.access.linkHelp}
        </p>
        <p className="footer-note">{TEXT.patient.access.demoNote(ACCESS_CODE)}</p>
      </div>
    </div>
  )
}

export default PatientAccess
