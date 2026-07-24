import { useState } from 'react'
import Card, { SectionHead } from '../../components/Card'
import Modal from '../../components/Modal'
import PatientsTable from '../../components/PatientsTable'
import { TEXT } from '../../text'
import type { Patient, Psychologist } from '../../types'

interface CoordinatorDashboardProps {
  patients: Patient[]
  psychologists: Psychologist[]
  onReassign: (rut: string, psychologistId: string) => void
  onOpenRecord: (patient: Patient) => void
  onOpenForm: (patient: Patient) => void
}

function CoordinatorDashboard({
  patients,
  psychologists,
  onReassign,
  onOpenRecord,
  onOpenForm,
}: CoordinatorDashboardProps) {
  const [reassigning, setReassigning] = useState<Patient | null>(null)
  const [targetId, setTargetId] = useState('')

  const psychName = (id: string) => psychologists.find((p) => p.id === id)?.name ?? id

  const openReassign = (patient: Patient) => {
    setReassigning(patient)
    setTargetId(patient.assignedPsychologistId)
  }

  const closeReassign = () => setReassigning(null)

  const confirmReassign = () => {
    if (reassigning && targetId) onReassign(reassigning.rut, targetId)
    closeReassign()
  }

  const { dashboard, reassignModal } = TEXT.coordinator

  return (
    <Card span="full">
      <SectionHead title={dashboard.title} subtitle={dashboard.subtitle} />
      <PatientsTable
        patients={patients}
        onOpenRecord={onOpenRecord}
        onOpenForm={onOpenForm}
        assignedColumn={{
          label: dashboard.columns.assignedPsych,
          value: (patient) => psychName(patient.assignedPsychologistId),
        }}
        actionsColumn={{
          label: dashboard.columns.actions,
          render: (patient) => (
            <button type="button" className="btn" onClick={() => openReassign(patient)}>
              {dashboard.reassign}
            </button>
          ),
        }}
      />
      {reassigning && (
        <Modal open>
          <h2>{reassignModal.title}</h2>
          <p className="subtitle">{reassignModal.subtitle}</p>
          <div className="field" style={{ marginTop: 16 }}>
            <label>{reassignModal.currentLabel}</label>
            <input value={psychName(reassigning.assignedPsychologistId)} readOnly />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>{reassignModal.newLabel}</label>
            <select value={targetId} onChange={(e) => setTargetId(e.target.value)}>
              {psychologists.map((psychologist) => (
                <option key={psychologist.id} value={psychologist.id}>
                  {psychologist.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={closeReassign}>
              {TEXT.common.cancel}
            </button>
            <button type="button" className="btn primary" onClick={confirmReassign}>
              {reassignModal.confirm}
            </button>
          </div>
        </Modal>
      )}
    </Card>
  )
}

export default CoordinatorDashboard
