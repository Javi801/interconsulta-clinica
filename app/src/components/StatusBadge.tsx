import type { FormStatus } from '../types'
import { STATUS_CLASSES, STATUS_LABELS } from '../data/seed'

interface StatusBadgeProps {
  status: FormStatus
  onClick?: () => void
}

function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const className = `status ${STATUS_CLASSES[status]}`
  if (onClick) {
    return (
      <button type="button" className={`${className} status-button`} onClick={onClick}>
        {STATUS_LABELS[status]}
      </button>
    )
  }
  return <span className={className}>{STATUS_LABELS[status]}</span>
}

export default StatusBadge
