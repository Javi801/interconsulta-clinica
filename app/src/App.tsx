import { useState } from 'react'
import Sidebar, { type ViewId } from './components/Sidebar'
import { SEED_PATIENTS, TEXT } from './text'
import type { Patient } from './types'
import PatientView from './views/PatientView'
import SessionClosed from './views/auth/SessionClosed'
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
            <PsychView patients={patients} onPatientsChange={setPatients} />
          ) : (
            <SessionClosed />
          ))}
        {activeView === 'coordinator' &&
          (sessions.coordinator ? (
            <section className="view active">
              <p className="subtitle">{TEXT.coordinator.placeholder}</p>
            </section>
          ) : (
            <SessionClosed />
          ))}
      </main>
    </div>
  )
}

export default App
