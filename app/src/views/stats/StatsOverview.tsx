import type { ReactNode } from 'react'
import { TEXT } from '../../text'

interface StatsOverviewProps {
  /** Scope caption shown under the title. */
  subtitle: string
  onOpenFull: () => void
  /** The four stat cards, role-specific. */
  children: ReactNode
}

const { overview } = TEXT.stats

function StatsOverview({ subtitle, onOpenFull, children }: StatsOverviewProps) {
  return (
    <div className="card full stats-overview">
      <div className="section-head">
        <div>
          <h2>{overview.title}</h2>
          <p>{subtitle}</p>
        </div>
        <button type="button" className="btn primary" onClick={onOpenFull}>
          {overview.openFull}
        </button>
      </div>
      <div className="stats-grid">{children}</div>
    </div>
  )
}

export default StatsOverview
