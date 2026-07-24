import { useState } from 'react'
import PatientAccess from './patient/PatientAccess'
import PatientFormView from './patient/PatientFormView'

interface PatientViewProps {
  onSubmit: (rut: string, name: string) => void
}

function PatientView({ onSubmit }: PatientViewProps) {
  const [rut, setRut] = useState<string | null>(null)

  return (
    <section className="view active">
      {rut !== null ? (
        <PatientFormView rut={rut} onSubmit={onSubmit} />
      ) : (
        <PatientAccess onEnter={(accessRut) => setRut(accessRut)} />
      )}
    </section>
  )
}

export default PatientView
