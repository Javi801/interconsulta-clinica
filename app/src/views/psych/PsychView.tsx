import { useMemo, useState } from 'react'
import { IMPORTED_RUT } from '../../seed/demoData'
import { TEXT } from '../../text'
import type { Patient } from '../../types'
import { computeClinicalStats } from '../../utils/stats'
import StatsDashboard from '../stats/StatsDashboard'
import StatsOverview from '../stats/StatsOverview'
import Dashboard from './Dashboard'
import PatientRecord from './PatientRecord'
import PsychFormView from './PsychFormView'

type SubView = 'dashboard' | 'stats' | 'record' | 'form'

interface PsychViewProps {
  patients: Patient[]
  psychologistId: string
  onPatientsChange: (patients: Patient[]) => void
}

function PsychView({ patients, psychologistId, onPatientsChange }: PsychViewProps) {
  const [subview, setSubview] = useState<SubView>('dashboard')
  const [selected, setSelected] = useState<Patient | null>(null)

  const ownPatients = useMemo(
    () => patients.filter((patient) => patient.assignedPsychologistId === psychologistId),
    [patients, psychologistId],
  )

  const allStats = useMemo(() => computeClinicalStats(patients), [patients])
  const ownStats = useMemo(() => computeClinicalStats(ownPatients), [ownPatients])

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
        assignedPsychologistId: psychologistId,
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
            ? {
                ...patient,
                assignedPsychologistId: psychologistId,
                patientFormStatus: 'sent',
                updatedAt: TEXT.psych.view.today,
              }
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
          assignedPsychologistId: psychologistId,
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
      </div>
      {subview === 'dashboard' && (
        <>
          <StatsOverview stats={allStats} onOpenFull={() => setSubview('stats')} />
          <Dashboard
            patients={ownPatients}
            onCreate={createPatient}
            onImportExcel={importExcel}
            onOpenRecord={openRecord}
            onOpenForm={openForm}
          />
        </>
      )}
      {subview === 'stats' && (
        <StatsDashboard allStats={allStats} personalStats={ownStats} onBack={backToDashboard} />
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
