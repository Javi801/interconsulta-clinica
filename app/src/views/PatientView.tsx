import { useState } from 'react'
import Modal from '../components/Modal'
import { SEED_PATIENT_FORM, TEXT } from '../text'
import { isValidRut } from '../utils/rut'
import {
  isFamilyHistoryValid,
  isGeneralValid,
  isLifeEventValid,
  isMedicationValid,
  isMotiveValid,
  isSubstanceValid,
  isSymptomValid,
  isValidEmail,
} from '../utils/validation'
import type { FormStatus, PatientForm } from '../types'
import FamilyHistoryCard from './patient/FamilyHistoryCard'
import GeneralDataCard from './patient/GeneralDataCard'
import LifeEventsCard from './patient/LifeEventsCard'
import MedicationsCard from './patient/MedicationsCard'
import MotiveCard from './patient/MotiveCard'
import SatisfactionCard from './patient/SatisfactionCard'
import SubstancesCard from './patient/SubstancesCard'
import SymptomsCard from './patient/SymptomsCard'

function validateForSubmit(form: PatientForm): string | null {
  if (!isGeneralValid(form.general)) return TEXT.validation.general
  if (!isValidRut(form.general.rut)) return TEXT.validation.rut
  if (!isValidEmail(form.general.email)) return TEXT.validation.email
  if (!isMotiveValid(form.motive)) return TEXT.validation.motive
  if (form.symptoms.length === 0) return TEXT.validation.symptomsRequired
  if (!form.symptoms.every(isSymptomValid)) return TEXT.validation.symptoms
  if (!form.medications.every(isMedicationValid)) return TEXT.validation.medications
  if (!form.substances.every(isSubstanceValid)) return TEXT.validation.substances
  if (!form.familyHistory.every(isFamilyHistoryValid)) return TEXT.validation.familyHistory
  if (!form.lifeEvents.every(isLifeEventValid)) return TEXT.validation.lifeEvents
  return null
}

function PatientView() {
  const [form, setForm] = useState<PatientForm>(SEED_PATIENT_FORM)
  const [status, setStatus] = useState<FormStatus>('draft')
  const [confirming, setConfirming] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const update =
    <K extends keyof PatientForm>(key: K) =>
    (value: PatientForm[K]) =>
      setForm((current) => ({ ...current, [key]: value }))

  const handleSave = () => alert(TEXT.patient.view.savedAlert)

  const handleSubmit = () => {
    const error = validateForSubmit(form)
    if (error) {
      setShowErrors(true)
      alert(error)
      return
    }
    setShowErrors(false)
    setConfirming(true)
  }

  const confirmSubmit = () => {
    setConfirming(false)
    setStatus('sent')
  }

  return (
    <section className="view active">
      <div className="topbar">
        <div>
          <h1>{TEXT.patient.view.title}</h1>
          <p className="subtitle">{TEXT.patient.view.subtitle}</p>
        </div>
        <div className="actions">
          <button type="button" className="btn" onClick={handleSave}>
            {TEXT.patient.view.save}
          </button>
          <button type="button" className="btn primary" onClick={handleSubmit}>
            {TEXT.patient.view.submit}
          </button>
        </div>
      </div>
      <div className="notice">{TEXT.patient.view.notice}</div>
      <div className="grid">
        <GeneralDataCard
          value={form.general}
          onChange={update('general')}
          status={status}
          showErrors={showErrors}
        />
        <MotiveCard value={form.motive} onChange={update('motive')} showErrors={showErrors} />
        <SatisfactionCard value={form.satisfaction} onChange={update('satisfaction')} />
        <SymptomsCard value={form.symptoms} onChange={update('symptoms')} showErrors={showErrors} />
        <MedicationsCard
          value={form.medications}
          onChange={update('medications')}
          showErrors={showErrors}
        />
        <SubstancesCard
          value={form.substances}
          onChange={update('substances')}
          showErrors={showErrors}
        />
        <FamilyHistoryCard
          value={form.familyHistory}
          onChange={update('familyHistory')}
          showErrors={showErrors}
        />
        <LifeEventsCard
          value={form.lifeEvents}
          onChange={update('lifeEvents')}
          showErrors={showErrors}
        />
      </div>
      <p className="footer-note">{TEXT.patient.view.footerNote}</p>
      {confirming && (
        <Modal open>
          <h2>{TEXT.patient.view.confirmModal.title}</h2>
          <p className="subtitle">{TEXT.patient.view.confirmModal.subtitle}</p>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={() => setConfirming(false)}>
              {TEXT.common.cancel}
            </button>
            <button type="button" className="btn primary" onClick={confirmSubmit}>
              {TEXT.patient.view.confirmModal.confirm}
            </button>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default PatientView
