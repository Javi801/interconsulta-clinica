import type { Patient } from '../../types'

interface PatientRecordProps {
  patient: Patient
  onBack: () => void
}

function PatientRecord({ patient, onBack }: PatientRecordProps) {
  return (
    <div>
      <div className="topbar">
        <div>
          <button type="button" className="btn ghost" onClick={onBack}>
            ← Volver
          </button>
          <h1 style={{ marginTop: 12 }}>Respuestas del paciente</h1>
          <p className="subtitle">
            {patient.name} · {patient.rut}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientRecord
