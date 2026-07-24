import type { ReactNode } from 'react'
import StatusBadge from './StatusBadge'
import { TEXT } from '../text'
import type { Patient } from '../types'

interface PatientsTableProps {
  patients: Patient[]
  onOpenRecord: (patient: Patient) => void
  onOpenForm: (patient: Patient) => void
  /** When set, renders an assigned-psychologist column with this label/value. */
  assignedColumn?: {
    label: string
    value: (patient: Patient) => string
  }
  /** When set, renders a trailing actions column with this label/content. */
  actionsColumn?: {
    label: string
    render: (patient: Patient) => ReactNode
  }
}

function PatientsTable({
  patients,
  onOpenRecord,
  onOpenForm,
  assignedColumn,
  actionsColumn,
}: PatientsTableProps) {
  const { columns } = TEXT.psych.dashboard

  return (
    <table>
      <thead>
        <tr>
          <th>{columns.rut}</th>
          <th>{columns.patient}</th>
          {assignedColumn && <th>{assignedColumn.label}</th>}
          <th>{columns.patientForm}</th>
          <th>{columns.psychForm}</th>
          <th>{columns.updatedAt}</th>
          {actionsColumn && <th>{actionsColumn.label}</th>}
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.rut}>
            <td>{patient.rut}</td>
            <td>{patient.name}</td>
            {assignedColumn && <td>{assignedColumn.value(patient)}</td>}
            <td>
              <StatusBadge status={patient.patientFormStatus} onClick={() => onOpenRecord(patient)} />
            </td>
            <td>
              <StatusBadge status={patient.psychFormStatus} onClick={() => onOpenForm(patient)} />
            </td>
            <td>{patient.updatedAt}</td>
            {actionsColumn && <td>{actionsColumn.render(patient)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PatientsTable
