import { useState, type ChangeEvent } from 'react'
import Card, { SectionHead } from '../../components/Card'
import Modal from '../../components/Modal'
import StatusBadge from '../../components/StatusBadge'
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
      alert('Debes ingresar al menos el RUT.')
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
      <SectionHead
        title="Pacientes"
        subtitle="Haz clic sobre el estado del formulario que quieras revisar."
      >
        <div className="actions">
          <button type="button" className="btn" onClick={() => setCreating(true)}>
            Nuevo paciente
          </button>
          <label className="btn" style={{ display: 'inline-flex', alignItems: 'center' }}>
            Cargar Excel
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
            <th>RUT</th>
            <th>Paciente</th>
            <th>Form. paciente</th>
            <th>Form. psicólogo</th>
            <th>Actualización</th>
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
          <h2>Nueva instancia de paciente</h2>
          <p className="subtitle">
            Ingresa al menos el RUT para crear el registro y habilitar el formulario del paciente.
          </p>
          <div className="field" style={{ marginTop: 16 }}>
            <label>RUT</label>
            <input
              placeholder="12.345.678-9"
              value={newRut}
              onChange={(e) => setNewRut(e.target.value)}
            />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>Nombre, opcional</label>
            <input
              placeholder="Nombre del paciente"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={closeModal}>
              Cancelar
            </button>
            <button type="button" className="btn primary" onClick={handleCreate}>
              Crear paciente
            </button>
          </div>
        </Modal>
      )}
    </Card>
  )
}

export default Dashboard
