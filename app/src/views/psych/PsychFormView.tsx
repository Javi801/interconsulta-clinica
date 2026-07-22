import { useState } from 'react'
import { SEED_PATIENT_FORM, SEED_PSYCH_FORM } from '../../data/seed'
import type { FormStatus, Patient, PsychForm, ReferralReport } from '../../types'
import PsychResults from './PsychResults'
import PsychFormContent from './form/PsychFormContent'

interface PsychFormViewProps {
  patient: Patient
  onBack: () => void
}

function PsychFormView({ patient, onBack }: PsychFormViewProps) {
  const [form, setForm] = useState<PsychForm>(SEED_PSYCH_FORM)
  const [status, setStatus] = useState<FormStatus>(patient.psychFormStatus)
  const [showResults, setShowResults] = useState(false)

  const handleGenerate = () => setShowResults(true)

  const handleSend = () => {
    setStatus('sent')
    alert('Formulario del psicólogo marcado como enviado.')
  }

  const handleEdit = () => {
    setShowResults(false)
    setStatus('draft')
  }

  const setReport = (report: ReferralReport) => setForm({ ...form, report })

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
        <div className="actions">
          {status === 'sent' && (
            <button type="button" className="btn" onClick={handleEdit}>
              Editar
            </button>
          )}
          <button
            type="button"
            className="btn"
            onClick={() => alert('Demo: exportación de resultados.')}
          >
            Exportar resultados
          </button>
          <button type="button" className="btn primary" onClick={handleGenerate}>
            Generar resultados
          </button>
          <button type="button" className="btn success" onClick={handleSend}>
            Enviar formulario
          </button>
        </div>
      </div>
      {showResults ? (
        <PsychResults patientForm={SEED_PATIENT_FORM} psychForm={form} onReportChange={setReport} />
      ) : (
        <PsychFormContent form={form} onChange={setForm} status={status} />
      )}
    </div>
  )
}

export default PsychFormView
