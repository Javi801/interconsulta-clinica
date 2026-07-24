import { useState } from 'react'
import { IMPORTED_RUT, TEXT } from '../../text'
import type { Patient } from '../../types'
import Dashboard from './Dashboard'
import PatientRecord from './PatientRecord'
import PsychFormView from './PsychFormView'

type SubView = 'dashboard' | 'record' | 'form'

interface PsychViewProps {
  patients: Patient[]
  onPatientsChange: (patients: Patient[]) => void
}

function PsychView({ patients, onPatientsChange }: PsychViewProps) {
  const [subview, setSubview] = useState<SubView>('dashboard')
  const [selected, setSelected] = useState<Patient | null>(null)

  const openRecord = (patient: Patient) => {
    if (patient.patientFormStatus !== 'sent') {
      alert(TEXT.psych.view.notSentAlert)
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
    onPatientsChange([
      ...patients,
      {
        rut,
        name,
        patientFormStatus: 'not-sent',
        psychFormStatus: 'pending',
        updatedAt: TEXT.psych.view.today,
      },
    ])
  }

  const importExcel = (fileName: string) => {
    const importedName = fileName.replace(/\.(xlsx|xls)$/i, '') || TEXT.psych.view.importedPatient
    const existing = patients.find((patient) => patient.rut === IMPORTED_RUT)
    if (existing) {
      onPatientsChange(
        patients.map((patient) =>
          patient.rut === IMPORTED_RUT
            ? { ...patient, patientFormStatus: 'sent', updatedAt: TEXT.psych.view.today }
            : patient,
        ),
      )
      alert(TEXT.psych.view.excelReplacedAlert)
    } else {
      onPatientsChange([
        ...patients,
        {
          rut: IMPORTED_RUT,
          name: importedName,
          patientFormStatus: 'sent',
          psychFormStatus: 'pending',
          updatedAt: TEXT.psych.view.today,
        },
      ])
      alert(TEXT.psych.view.excelCreatedAlert)
    }
  }

  return (
    <section className="view active">
      <div className="topbar">
        <div>
          <h1>{TEXT.psych.view.title}</h1>
          <p className="subtitle">{TEXT.psych.view.subtitle}</p>
        </div>
        <div className="actions">
          <button type="button" className="btn">
            {TEXT.psych.view.exportExcel}
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
