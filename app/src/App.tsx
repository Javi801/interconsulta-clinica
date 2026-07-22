import { useState } from 'react'
import Sidebar, { type ViewId } from './components/Sidebar'
import PatientView from './views/PatientView'
import PsychView from './views/psych/PsychView'

function App() {
  const [activeView, setActiveView] = useState<ViewId>('patient')

  return (
    <div className="app">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main>{activeView === 'patient' ? <PatientView /> : <PsychView />}</main>
    </div>
  )
}

export default App
