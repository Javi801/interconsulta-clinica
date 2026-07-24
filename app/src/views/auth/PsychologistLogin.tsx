import { TEXT } from '../../text'
import StaffLogin from './StaffLogin'

interface PsychologistLoginProps {
  onLogin: () => void
}

function PsychologistLogin({ onLogin }: PsychologistLoginProps) {
  return (
    <StaffLogin
      title={TEXT.auth.psych.title}
      subtitle={TEXT.auth.psych.subtitle}
      onLogin={onLogin}
    />
  )
}

export default PsychologistLogin
