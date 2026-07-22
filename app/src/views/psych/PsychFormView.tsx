import type { Patient } from '../../types'

interface PsychFormViewProps {
  patient: Patient
  onBack: () => void
}

function PsychFormView({ patient, onBack }: PsychFormViewProps) {
  return (
    <div>
      <div className="topbar">
        <div>
          <button type="button" className="btn ghost" onClick={onBack}>
            ← Volver
          </button>
          <h1 style={{ marginTop: 12 }}>Formulario del psicólogo</h1>
          <p className="subtitle">{patient.name} · evaluación clínica</p>
        </div>
      </div>
    </div>
  )
}

export default PsychFormView
