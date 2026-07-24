import { useState } from 'react'
import Sidebar, { type ViewId } from './components/Sidebar'
import { SEED_PATIENTS } from './text'
import type { Patient } from './types'
import PatientView from './views/PatientView'
import PsychView from './views/psych/PsychView'

function App() {
  const [activeView, setActiveView] = useState<ViewId>('patient')
  const [patients, setPatients] = useState<Patient[]>(SEED_PATIENTS)

  const overwritePatientName = (rut: string, name: string) =>
    setPatients((current) =>
      current.map((patient) => (patient.rut === rut ? { ...patient, name } : patient)),
    )

  return (
    <div className="app">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main>
        {activeView === 'patient' ? (
          <PatientView onSubmit={overwritePatientName} />
        ) : (
          <PsychView patients={patients} onPatientsChange={setPatients} />
        )}
      </main>
    </div>
  )
}

export default App
