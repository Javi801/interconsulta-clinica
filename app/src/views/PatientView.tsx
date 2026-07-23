import { useState } from 'react'
import PatientAccess from './patient/PatientAccess'
import PatientFormView from './patient/PatientFormView'

function PatientView() {
  const [accessed, setAccessed] = useState(false)

  return (
    <section className="view active">
      {accessed ? <PatientFormView /> : <PatientAccess onEnter={() => setAccessed(true)} />}
    </section>
  )
}

export default PatientView
