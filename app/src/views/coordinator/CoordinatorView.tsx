import { useMemo, useState } from 'react'
import { TEXT } from '../../text'
import type { Patient, Psychologist } from '../../types'
import { computeClinicalStats } from '../../utils/stats'
import StatsDashboard from '../stats/StatsDashboard'
import StatsOverview from '../stats/StatsOverview'
import PatientRecord from '../psych/PatientRecord'
import PsychFormView from '../psych/PsychFormView'
import CoordinatorDashboard from './CoordinatorDashboard'

type SubView = 'dashboard' | 'stats' | 'record' | 'form'

interface CoordinatorViewProps {
  patients: Patient[]
  psychologists: Psychologist[]
  onReassign: (rut: string, psychologistId: string) => void
}

function CoordinatorView({ patients, psychologists, onReassign }: CoordinatorViewProps) {
  const [subview, setSubview] = useState<SubView>('dashboard')
  const [selected, setSelected] = useState<Patient | null>(null)

  const allStats = useMemo(() => computeClinicalStats(patients), [patients])

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

  return (
    <section className="view active">
      <div className="topbar">
        <div>
          <h1>{TEXT.coordinator.view.title}</h1>
          <p className="subtitle">{TEXT.coordinator.view.subtitle}</p>
        </div>
      </div>
      {subview === 'dashboard' && (
        <>
          <StatsOverview stats={allStats} onOpenFull={() => setSubview('stats')} />
          <CoordinatorDashboard
            patients={patients}
            psychologists={psychologists}
            onReassign={onReassign}
            onOpenRecord={openRecord}
            onOpenForm={openForm}
          />
        </>
      )}
      {subview === 'stats' && <StatsDashboard allStats={allStats} onBack={backToDashboard} />}
      {subview === 'record' && selected && (
        <PatientRecord patient={selected} onBack={backToDashboard} readOnly />
      )}
      {subview === 'form' && selected && (
        <PsychFormView patient={selected} onBack={backToDashboard} readOnly />
      )}
    </section>
  )
}

export default CoordinatorView
