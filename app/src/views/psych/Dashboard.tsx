import { useState, type ChangeEvent } from 'react'
import Card, { SectionHead } from '../../components/Card'
import Modal from '../../components/Modal'
import PatientsTable from '../../components/PatientsTable'
import { TEXT } from '../../text'
import { formatRut } from '../../utils/rut'
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
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')

  const closeModal = () => {
    setCreating(false)
    setNewRut('')
    setNewFirstName('')
    setNewLastName('')
  }

  const handleCreate = () => {
    const rut = newRut.trim()
    const firstName = newFirstName.trim()
    const lastName = newLastName.trim()
    if (!rut) {
      alert(TEXT.psych.dashboard.rutRequiredAlert)
      return
    }
    if (!firstName || !lastName) {
      alert(TEXT.psych.dashboard.nameRequiredAlert)
      return
    }
    onCreate(rut, `${firstName} ${lastName}`)
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
      <PatientsTable patients={patients} onOpenRecord={onOpenRecord} onOpenForm={onOpenForm} />
      {creating && (
        <Modal open>
          <h2>{TEXT.psych.dashboard.createModal.title}</h2>
          <p className="subtitle">{TEXT.psych.dashboard.createModal.subtitle}</p>
          <div className="field" style={{ marginTop: 16 }}>
            <label>{TEXT.psych.dashboard.createModal.rutLabel}</label>
            <input
              inputMode="numeric"
              placeholder={TEXT.psych.dashboard.createModal.rutPlaceholder}
              value={newRut}
              onChange={(e) => setNewRut(formatRut(e.target.value))}
            />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>{TEXT.psych.dashboard.createModal.firstNameLabel}</label>
            <input
              placeholder={TEXT.psych.dashboard.createModal.firstNamePlaceholder}
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>{TEXT.psych.dashboard.createModal.lastNameLabel}</label>
            <input
              placeholder={TEXT.psych.dashboard.createModal.lastNamePlaceholder}
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
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
