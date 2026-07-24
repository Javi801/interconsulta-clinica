import { useState } from 'react'
import Modal from '../../components/Modal'
import { getSeedPatientForm } from '../../seed/demoData'
import { TEXT } from '../../text'
import { isValidRut } from '../../utils/rut'
import {
  isFamilyHistoryValid,
  isGeneralValid,
  isLifeEventValid,
  isMedicationValid,
  isMotiveValid,
  isPersonalHistoryValid,
  isSubstanceValid,
  isSymptomValid,
} from '../../utils/validation'
import type { FormStatus, PatientForm } from '../../types'
import FamilyHistoryCard from './FamilyHistoryCard'
import GeneralDataCard from './GeneralDataCard'
import LifeEventsCard from './LifeEventsCard'
import MedicationsCard from './MedicationsCard'
import MentalHistoryCard from './MentalHistoryCard'
import MotiveCard from './MotiveCard'
import PhysicalHistoryCard from './PhysicalHistoryCard'
import SatisfactionCard from './SatisfactionCard'
import SubstancesCard from './SubstancesCard'
import SymptomsCard from './SymptomsCard'

function validateForSubmit(form: PatientForm): string | null {
  if (!isGeneralValid(form.general)) return TEXT.validation.general
  if (!isValidRut(form.general.rut)) return TEXT.validation.rut
  if (!isMotiveValid(form.motive)) return TEXT.validation.motive
  if (form.symptoms.length === 0) return TEXT.validation.symptomsRequired
  if (!form.symptoms.every(isSymptomValid)) return TEXT.validation.symptoms
  if (!form.medications.every(isMedicationValid)) return TEXT.validation.medications
  if (!form.substances.every(isSubstanceValid)) return TEXT.validation.substances
  if (!form.familyHistory.every(isFamilyHistoryValid)) return TEXT.validation.familyHistory
  if (!form.mentalHistory.every(isPersonalHistoryValid)) return TEXT.validation.mentalHistory
  if (!form.physicalHistory.every(isPersonalHistoryValid)) return TEXT.validation.physicalHistory
  if (!form.lifeEvents.every(isLifeEventValid)) return TEXT.validation.lifeEvents
  return null
}

interface PatientFormViewProps {
  rut: string
  onSubmit: (rut: string, name: string) => void
}

function PatientFormView({ rut, onSubmit }: PatientFormViewProps) {
  const [form, setForm] = useState<PatientForm>(() => getSeedPatientForm(rut))
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
    const name = `${form.general.firstName.trim()} ${form.general.lastName.trim()}`.trim()
    onSubmit(form.general.rut, name)
  }

  return (
    <>
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
          mentalHistory={form.mentalHistory}
          physicalHistory={form.physicalHistory}
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
        <MentalHistoryCard value={form.mentalHistory} onChange={update('mentalHistory')} />
        <PhysicalHistoryCard value={form.physicalHistory} onChange={update('physicalHistory')} />
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
    </>
  )
}

export default PatientFormView
