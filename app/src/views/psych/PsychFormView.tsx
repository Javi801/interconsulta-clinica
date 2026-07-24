import { useState } from 'react'
import { getSeedPatientForm, getSeedPsychForm } from '../../seed/demoData'
import { TEXT } from '../../text'
import type { FormStatus, Patient, PsychForm, ReferralReport } from '../../types'
import PsychResults from './PsychResults'
import PsychFormContent from './form/PsychFormContent'

interface PsychFormViewProps {
  patient: Patient
  onBack: () => void
  /** Coordinator view: content stays visible but no editing, export or submit. */
  readOnly?: boolean
}

function PsychFormView({ patient, onBack, readOnly = false }: PsychFormViewProps) {
  const patientForm = getSeedPatientForm(patient.rut)
  const [form, setForm] = useState<PsychForm>(() => getSeedPsychForm(patient.rut))
  const [status, setStatus] = useState<FormStatus>(patient.psychFormStatus)
  const [showResults, setShowResults] = useState(false)

  const isSent = status === 'sent'

  const handleSend = () => {
    setStatus('sent')
    alert(TEXT.psych.formView.sentAlert)
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
          {showResults ? (
            <>
              <button type="button" className="btn" onClick={() => setShowResults(false)}>
                {TEXT.psych.formView.backToForm}
              </button>
              {!readOnly && (
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => alert(TEXT.psych.formView.exportResultsAlert)}
                >
                  {TEXT.psych.formView.exportResults}
                </button>
              )}
            </>
          ) : (
            <>
              {!readOnly && (
                <>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => alert(TEXT.psych.formView.exportExcelAlert)}
                  >
                    {TEXT.psych.formView.exportExcel}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => alert(TEXT.psych.formView.draftSavedAlert)}
                  >
                    {TEXT.psych.formView.saveDraft}
                  </button>
                  <button type="button" className="btn success" onClick={handleSend}>
                    {isSent ? TEXT.psych.formView.resubmit : TEXT.psych.formView.submit}
                  </button>
                </>
              )}
              <button
                type="button"
                className="btn primary"
                onClick={() => setShowResults(true)}
                disabled={!isSent}
              >
                {TEXT.psych.formView.viewResults}
              </button>
            </>
          )}
        </div>
      </div>
      {showResults ? (
        <PsychResults
          patientForm={patientForm}
          psychForm={form}
          onReportChange={setReport}
          readOnly={readOnly}
        />
      ) : readOnly ? (
        <fieldset className="readonly-form" disabled>
          <PsychFormContent
            patientForm={patientForm}
            form={form}
            onChange={setForm}
            status={status}
          />
        </fieldset>
      ) : (
        <PsychFormContent
          patientForm={patientForm}
          form={form}
          onChange={setForm}
          status={status}
        />
      )}
    </div>
  )
}

export default PsychFormView
