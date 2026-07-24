import { useState } from 'react'
import Card from '../../components/Card'
import Modal from '../../components/Modal'
import { EDIT_PIN, getSeedPatientForm } from '../../seed/demoData'
import { TEXT } from '../../text'
import {
  familyAndSubstancesSummary,
  generalSummary,
  medicationsSummary,
  motiveSummary,
  personalHistorySummary,
  symptomsSummary,
} from '../../utils/summary'
import type { Patient } from '../../types'

interface PatientRecordProps {
  patient: Patient
  onBack: () => void
  /** Coordinator view: hide PIN generation and result download. */
  readOnly?: boolean
}

function PatientRecord({ patient, onBack, readOnly = false }: PatientRecordProps) {
  const [showPin, setShowPin] = useState(false)
  const form = getSeedPatientForm(patient.rut)

  return (
    <div>
      <div className="topbar">
        <div>
          <button type="button" className="btn ghost" onClick={onBack}>
            {TEXT.common.back}
          </button>
          <h1 style={{ marginTop: 12 }}>{TEXT.psych.record.title}</h1>
          <p className="subtitle">
            {patient.name} · {patient.rut}
          </p>
        </div>
        {!readOnly && (
          <div className="actions">
            <button type="button" className="btn" onClick={() => setShowPin(true)}>
              {TEXT.psych.record.generatePin}
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={() => alert(TEXT.psych.record.downloadAlert)}
            >
              {TEXT.psych.record.downloadResults}
            </button>
          </div>
        )}
      </div>
      <div className="grid">
        <Card span={6}>
          <h2>{TEXT.psych.record.cards.generalData}</h2>
          <div className="summary-box">{generalSummary(form)}</div>
        </Card>
        <Card span={6}>
          <h2>{TEXT.psych.record.cards.motive}</h2>
          <div className="summary-box">{motiveSummary(form)}</div>
        </Card>
        <Card span="full">
          <h2>{TEXT.psych.record.cards.symptoms}</h2>
          <div className="summary-box">{symptomsSummary(form)}</div>
        </Card>
        <Card span={6}>
          <h2>{TEXT.psych.record.cards.medications}</h2>
          <div className="summary-box">{medicationsSummary(form)}</div>
        </Card>
        <Card span={6}>
          <h2>{TEXT.psych.record.cards.familyAndSubstances}</h2>
          <div className="summary-box">{familyAndSubstancesSummary(form)}</div>
        </Card>
        <Card span="full">
          <h2>{TEXT.psych.record.cards.personalHistory}</h2>
          <div className="summary-box">{personalHistorySummary(form)}</div>
        </Card>
      </div>
      {showPin && (
        <Modal open>
          <h2>{TEXT.psych.record.pinModal.title}</h2>
          <p className="subtitle">{TEXT.psych.record.pinModal.subtitle}</p>
          <div
            className="summary-box"
            style={{
              fontSize: 28,
              textAlign: 'center',
              fontWeight: 800,
              letterSpacing: 8,
              marginTop: 16,
            }}
          >
            {EDIT_PIN}
          </div>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={() => setShowPin(false)}>
              {TEXT.psych.record.pinModal.close}
            </button>
            <button type="button" className="btn primary">
              {TEXT.psych.record.pinModal.copy}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default PatientRecord
