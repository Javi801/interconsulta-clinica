import PatientAccess from './patient/PatientAccess'
import PatientFormView from './patient/PatientFormView'

interface PatientViewProps {
  rut: string | null
  onEnter: (rut: string) => void
  onSubmit: (rut: string, name: string) => void
}

function PatientView({ rut, onEnter, onSubmit }: PatientViewProps) {
  return (
    <section className="view active">
      {rut !== null ? (
        <PatientFormView rut={rut} onSubmit={onSubmit} />
      ) : (
        <PatientAccess onEnter={onEnter} />
      )}
    </section>
  )
}

export default PatientView
