import { useState } from 'react'
import { SEED_PATIENT_FORM, SEED_PSYCH_FORM, TEXT } from '../../text'
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
    alert(TEXT.psych.formView.sentAlert)
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
            {TEXT.common.back}
          </button>
          <h1 style={{ marginTop: 12 }}>{TEXT.psych.formView.title}</h1>
          <p className="subtitle">{TEXT.psych.formView.subtitle(patient.name)}</p>
        </div>
        <div className="actions">
          {status === 'sent' && (
            <button type="button" className="btn" onClick={handleEdit}>
              {TEXT.psych.formView.edit}
            </button>
          )}
          <button
            type="button"
            className="btn"
            onClick={() => alert(TEXT.psych.formView.exportAlert)}
          >
            {TEXT.psych.formView.exportResults}
          </button>
          <button type="button" className="btn primary" onClick={handleGenerate}>
            {TEXT.psych.formView.generateResults}
          </button>
          <button type="button" className="btn success" onClick={handleSend}>
            {TEXT.psych.formView.submit}
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
