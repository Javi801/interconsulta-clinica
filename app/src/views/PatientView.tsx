import { useState } from 'react'
import Modal from '../components/Modal'
import { SEED_PATIENT_FORM } from '../data/seed'
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
  if (!isGeneralValid(form.general)) return 'Completa todos los campos de Datos generales.'
  if (!isValidRut(form.general.rut)) return 'El RUT ingresado no es válido.'
  if (!isValidEmail(form.general.email)) return 'El correo ingresado no es válido.'
  if (!isMotiveValid(form.motive)) return 'Completa todos los campos de Motivo y expectativas.'
  if (form.symptoms.length === 0) return 'Debes registrar al menos un síntoma.'
  if (!form.symptoms.every(isSymptomValid))
    return 'Completa los campos obligatorios de Síntomas actuales.'
  if (!form.medications.every(isMedicationValid))
    return 'Completa los campos obligatorios de Medicamentos actuales.'
  if (!form.substances.every(isSubstanceValid))
    return 'Completa los campos obligatorios de Consumo de sustancias.'
  if (!form.familyHistory.every(isFamilyHistoryValid))
    return 'Completa los campos obligatorios de Antecedentes familiares.'
  if (!form.lifeEvents.every(isLifeEventValid))
    return 'Completa los campos obligatorios de Eventos importantes.'
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

  const handleSave = () => alert('Datos guardados en esta demostración.')

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
          <h1>Formulario del paciente</h1>
          <p className="subtitle">Completa tus antecedentes y síntomas actuales.</p>
        </div>
        <div className="actions">
          <button type="button" className="btn" onClick={handleSave}>
            Guardar
          </button>
          <button type="button" className="btn primary" onClick={handleSubmit}>
            Enviar formulario
          </button>
        </div>
      </div>
      <div className="notice">Demo: los datos ingresados no se envían ni almacenan.</div>
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
      <p className="footer-note">
        El mockup muestra solo una parte de los campos definidos para mantener la demo legible.
      </p>
      {confirming && (
        <Modal open>
          <h2>Enviar formulario</h2>
          <p className="subtitle">Verifica que está correcto.</p>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={() => setConfirming(false)}>
              Cancelar
            </button>
            <button type="button" className="btn primary" onClick={confirmSubmit}>
              Enviar
            </button>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default PatientView
