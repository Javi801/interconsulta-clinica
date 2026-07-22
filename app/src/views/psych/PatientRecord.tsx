import { useState } from 'react'
import Card from '../../components/Card'
import Modal from '../../components/Modal'
import { EDIT_PIN, SEED_PATIENT_FORM } from '../../data/seed'
import {
  familyAndSubstancesSummary,
  generalSummary,
  medicationsSummary,
  motiveSummary,
  symptomsSummary,
} from '../../utils/summary'
import type { Patient } from '../../types'

interface PatientRecordProps {
  patient: Patient
  onBack: () => void
}

function PatientRecord({ patient, onBack }: PatientRecordProps) {
  const [showPin, setShowPin] = useState(false)
  const form = SEED_PATIENT_FORM

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
        <div className="actions">
          <button type="button" className="btn" onClick={() => setShowPin(true)}>
            Generar PIN
          </button>
          <button
            type="button"
            className="btn primary"
            onClick={() => alert('Demo: descarga de resultados del formulario del paciente.')}
          >
            Descargar resultados
          </button>
        </div>
      </div>
      <div className="grid">
        <Card span={6}>
          <h2>Datos generales</h2>
          <div className="summary-box">{generalSummary(form)}</div>
        </Card>
        <Card span={6}>
          <h2>Motivo y expectativas</h2>
          <div className="summary-box">{motiveSummary(form)}</div>
        </Card>
        <Card span="full">
          <h2>Síntomas actuales</h2>
          <div className="summary-box">{symptomsSummary(form)}</div>
        </Card>
        <Card span={6}>
          <h2>Medicamentos actuales</h2>
          <div className="summary-box">{medicationsSummary(form)}</div>
        </Card>
        <Card span={6}>
          <h2>Antecedentes familiares y consumo</h2>
          <div className="summary-box">{familyAndSubstancesSummary(form)}</div>
        </Card>
      </div>
      {showPin && (
        <Modal open>
          <h2>PIN de edición</h2>
          <p className="subtitle">
            Este PIN debe ser entregado por un psicólogo para habilitar cambios en el formulario
            del paciente.
          </p>
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
              Cerrar
            </button>
            <button type="button" className="btn primary">
              Copiar PIN
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default PatientRecord
