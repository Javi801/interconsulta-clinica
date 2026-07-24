import Chip from '../../components/Chip'
import { PHYSICAL_HISTORY_OPTIONS, TEXT } from '../../text'
import type { PhysicalHistory } from '../../types'
import PersonalHistoryCard from './PersonalHistoryCard'

interface PhysicalHistoryCardProps {
  value: PhysicalHistory[]
  onChange: (value: PhysicalHistory[]) => void
}

function PhysicalHistoryCard({ value, onChange }: PhysicalHistoryCardProps) {
  return (
    <PersonalHistoryCard<PhysicalHistory>
      copy={TEXT.patient.physicalHistory}
      options={PHYSICAL_HISTORY_OPTIONS}
      value={value}
      onChange={onChange}
      createEntry={(id, condition) => ({
        id,
        condition,
        origin: 'Autopercibido',
        diagnosisDate: '',
        diagnosedBy: 'No sé / No recuerdo',
        severe: false,
        observation: '',
      })}
      renderExtra={(entry, patch) => (
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <Chip
            label={TEXT.patient.physicalHistory.severeLabel}
            checked={entry.severe}
            onChange={(severe) => patch({ severe })}
          />
        </div>
      )}
    />
  )
}

export default PhysicalHistoryCard
