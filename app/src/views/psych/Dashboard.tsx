import { useState, type ChangeEvent } from 'react'
import Card, { SectionHead } from '../../components/Card'
import Modal from '../../components/Modal'
import StatusBadge from '../../components/StatusBadge'
import { TEXT } from '../../text'
import type { Patient } from '../../types'

interface DashboardProps {
  patients: Patient[]
  onCreate: (rut: string, name: string) => void
  onImportExcel: (fileName: string) => void
  onOpenRecord: (patient: Patient) => void
  onOpenForm: (patient: Patient) => void
}

function Dashboard({ patients, onCreate, onImportExcel, onOpenRecord, onOpenForm }: DashboardProps) {
  const [creating, setCreating] = useState(false)
  const [newRut, setNewRut] = useState('')
  const [newName, setNewName] = useState('')

  const closeModal = () => {
    setCreating(false)
    setNewRut('')
    setNewName('')
  }

  const handleCreate = () => {
    const rut = newRut.trim()
    if (!rut) {
      alert(TEXT.psych.dashboard.rutRequiredAlert)
      return
    }
    onCreate(rut, newName.trim())
    closeModal()
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    onImportExcel(file.name)
    e.target.value = ''
  }

  return (
    <Card span="full">
      <SectionHead title={TEXT.psych.dashboard.title} subtitle={TEXT.psych.dashboard.subtitle}>
        <div className="actions">
          <button type="button" className="btn" onClick={() => setCreating(true)}>
            {TEXT.psych.dashboard.newPatient}
          </button>
          <label className="btn" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {TEXT.psych.dashboard.loadExcel}
            <input
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFile}
            />
          </label>
        </div>
      </SectionHead>
      <table>
        <thead>
          <tr>
            <th>{TEXT.psych.dashboard.columns.rut}</th>
            <th>{TEXT.psych.dashboard.columns.patient}</th>
            <th>{TEXT.psych.dashboard.columns.patientForm}</th>
            <th>{TEXT.psych.dashboard.columns.psychForm}</th>
            <th>{TEXT.psych.dashboard.columns.updatedAt}</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.rut}>
              <td>{patient.rut}</td>
              <td>{patient.name}</td>
              <td>
                <StatusBadge
                  status={patient.patientFormStatus}
                  onClick={() => onOpenRecord(patient)}
                />
              </td>
              <td>
                <StatusBadge status={patient.psychFormStatus} onClick={() => onOpenForm(patient)} />
              </td>
              <td>{patient.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {creating && (
        <Modal open>
          <h2>{TEXT.psych.dashboard.createModal.title}</h2>
          <p className="subtitle">{TEXT.psych.dashboard.createModal.subtitle}</p>
          <div className="field" style={{ marginTop: 16 }}>
            <label>{TEXT.psych.dashboard.createModal.rutLabel}</label>
            <input
              placeholder={TEXT.psych.dashboard.createModal.rutPlaceholder}
              value={newRut}
              onChange={(e) => setNewRut(e.target.value)}
            />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>{TEXT.psych.dashboard.createModal.nameLabel}</label>
            <input
              placeholder={TEXT.psych.dashboard.createModal.namePlaceholder}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={closeModal}>
              {TEXT.common.cancel}
            </button>
            <button type="button" className="btn primary" onClick={handleCreate}>
              {TEXT.psych.dashboard.createModal.create}
            </button>
          </div>
        </Modal>
      )}
    </Card>
  )
}

export default Dashboard
