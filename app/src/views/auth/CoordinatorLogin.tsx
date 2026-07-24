import { TEXT } from '../../text'
import StaffLogin from './StaffLogin'

interface CoordinatorLoginProps {
  onLogin: () => void
}

function CoordinatorLogin({ onLogin }: CoordinatorLoginProps) {
  return (
    <StaffLogin
      title={TEXT.auth.coordinator.title}
      subtitle={TEXT.auth.coordinator.subtitle}
      onLogin={onLogin}
    />
  )
}

export default CoordinatorLogin
