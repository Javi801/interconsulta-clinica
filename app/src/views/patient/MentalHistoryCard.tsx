import { MENTAL_HISTORY_OPTIONS, TEXT } from '../../text'
import type { MentalHistory } from '../../types'
import PersonalHistoryCard from './PersonalHistoryCard'

interface MentalHistoryCardProps {
  value: MentalHistory[]
  onChange: (value: MentalHistory[]) => void
}

function MentalHistoryCard({ value, onChange }: MentalHistoryCardProps) {
  return (
    <PersonalHistoryCard<MentalHistory>
      copy={TEXT.patient.mentalHistory}
      options={MENTAL_HISTORY_OPTIONS}
      value={value}
      onChange={onChange}
      createEntry={(id, condition) => ({
        id,
        condition,
        origin: 'Autopercibido',
        diagnosisDate: '',
        diagnosedBy: 'No sé / No recuerdo',
        observation: '',
      })}
    />
  )
}

export default MentalHistoryCard
