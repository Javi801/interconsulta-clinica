import { useState } from 'react'
import Sidebar, { type ViewId } from './components/Sidebar'
import { DEMO_PSYCHOLOGIST_ID, SEED_PATIENTS, SEED_PSYCHOLOGISTS } from './seed/demoData'
import type { Patient } from './types'
import PatientView from './views/PatientView'
import CoordinatorLogin from './views/auth/CoordinatorLogin'
import PsychologistLogin from './views/auth/PsychologistLogin'
import CoordinatorView from './views/coordinator/CoordinatorView'
import PsychView from './views/psych/PsychView'

const DEMO_PATIENT_RUT = SEED_PATIENTS[0].rut

function App() {
  const [activeView, setActiveView] = useState<ViewId>('patient')
  const [patients, setPatients] = useState<Patient[]>(SEED_PATIENTS)
  const [patientRut, setPatientRut] = useState<string | null>(null)
  const [staffLoggedIn, setStaffLoggedIn] = useState<Record<'psych' | 'coordinator', boolean>>({
    psych: true,
    coordinator: true,
  })

  const overwritePatientName = (rut: string, name: string) =>
    setPatients((current) =>
      current.map((patient) => (patient.rut === rut ? { ...patient, name } : patient)),
    )

  const reassignPatient = (rut: string, psychologistId: string) =>
    setPatients((current) =>
      current.map((patient) =>
        patient.rut === rut ? { ...patient, assignedPsychologistId: psychologistId } : patient,
      ),
    )

  const sessions: Record<ViewId, boolean> = {
    patient: patientRut !== null,
    psych: staffLoggedIn.psych,
    coordinator: staffLoggedIn.coordinator,
  }

  const toggleSession = (view: ViewId) => {
    if (view === 'patient') {
      setPatientRut((rut) => (rut === null ? DEMO_PATIENT_RUT : null))
    } else {
      setStaffLoggedIn((current) => ({ ...current, [view]: !current[view] }))
    }
  }

  return (
    <div className="app">
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        loggedIn={sessions}
        onToggleSession={toggleSession}
      />
      <main>
        {activeView === 'patient' && (
          <PatientView rut={patientRut} onEnter={setPatientRut} onSubmit={overwritePatientName} />
        )}
        {activeView === 'psych' &&
          (sessions.psych ? (
            <PsychView
              patients={patients}
              psychologistId={DEMO_PSYCHOLOGIST_ID}
              onPatientsChange={setPatients}
            />
          ) : (
            <PsychologistLogin onLogin={() => toggleSession('psych')} />
          ))}
        {activeView === 'coordinator' &&
          (sessions.coordinator ? (
            <CoordinatorView
              patients={patients}
              psychologists={SEED_PSYCHOLOGISTS}
              onReassign={reassignPatient}
            />
          ) : (
            <CoordinatorLogin onLogin={() => toggleSession('coordinator')} />
          ))}
      </main>
    </div>
  )
}

export default App
