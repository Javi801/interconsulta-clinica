import { useState } from 'react'
import { SEED_PATIENTS } from '../../data/seed'
import type { Patient } from '../../types'
import Dashboard from './Dashboard'
import PatientRecord from './PatientRecord'
import PsychFormView from './PsychFormView'

type SubView = 'dashboard' | 'record' | 'form'

const IMPORTED_RUT = '15.222.333-4'

function PsychView() {
  const [patients, setPatients] = useState<Patient[]>(SEED_PATIENTS)
  const [subview, setSubview] = useState<SubView>('dashboard')
  const [selected, setSelected] = useState<Patient | null>(null)

  const openRecord = (patient: Patient) => {
    if (patient.patientFormStatus !== 'sent') {
      alert('El formulario del paciente aún no ha sido enviado.')
      return
    }
    setSelected(patient)
    setSubview('record')
  }

  const openForm = (patient: Patient) => {
    setSelected(patient)
    setSubview('form')
  }

  const backToDashboard = () => setSubview('dashboard')

  const createPatient = (rut: string, name: string) => {
    setPatients([
      ...patients,
      {
        rut,
        name: name || 'Paciente sin nombre',
        patientFormStatus: 'not-sent',
        psychFormStatus: 'pending',
        updatedAt: 'Hoy',
      },
    ])
  }

  const importExcel = (fileName: string) => {
    const importedName = fileName.replace(/\.(xlsx|xls)$/i, '') || 'Paciente importado'
    const existing = patients.find((patient) => patient.rut === IMPORTED_RUT)
    if (existing) {
      setPatients(
        patients.map((patient) =>
          patient.rut === IMPORTED_RUT
            ? { ...patient, patientFormStatus: 'sent', updatedAt: 'Hoy' }
            : patient,
        ),
      )
      alert('Excel cargado: el formulario del paciente existente fue reemplazado y quedó como enviado.')
    } else {
      setPatients([
        ...patients,
        {
          rut: IMPORTED_RUT,
          name: importedName,
          patientFormStatus: 'sent',
          psychFormStatus: 'pending',
          updatedAt: 'Hoy',
        },
      ])
      alert('Excel cargado: se creó un nuevo paciente y su formulario quedó como enviado.')
    }
  }

  return (
    <section className="view active">
      <div className="topbar">
        <div>
          <h1>Panel del psicólogo</h1>
          <p className="subtitle">Accede a cada formulario directamente desde su estado.</p>
        </div>
        <div className="actions">
          <button type="button" className="btn">
            Exportar Excel
          </button>
        </div>
      </div>
      {subview === 'dashboard' && (
        <Dashboard
          patients={patients}
          onCreate={createPatient}
          onImportExcel={importExcel}
          onOpenRecord={openRecord}
          onOpenForm={openForm}
        />
      )}
      {subview === 'record' && selected && (
        <PatientRecord patient={selected} onBack={backToDashboard} />
      )}
      {subview === 'form' && selected && (
        <PsychFormView patient={selected} onBack={backToDashboard} />
      )}
    </section>
  )
}

export default PsychView
