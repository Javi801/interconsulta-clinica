import { useState } from 'react'
import { TEXT } from '../../text'
import type { ClinicalStats } from '../../utils/stats'
import AggregatedStats from './AggregatedStats'
import PersonalStats from './PersonalStats'

interface StatsDashboardProps {
  allStats: ClinicalStats
  /** When provided, enables the personal "Mis formularios" tab. */
  personalStats?: ClinicalStats
  onBack: () => void
}

type Tab = 'all' | 'mine'

const { dashboard } = TEXT.stats

function StatsDashboard({ allStats, personalStats, onBack }: StatsDashboardProps) {
  const showPersonal = personalStats !== undefined
  const [tab, setTab] = useState<Tab>(showPersonal ? 'mine' : 'all')

  return (
    <div>
      <div className="topbar">
        <div>
          <button type="button" className="btn ghost" onClick={onBack}>
            {TEXT.common.back}
          </button>
          <h1 className="mt-12">{dashboard.title}</h1>
          <p className="subtitle">{dashboard.subtitle}</p>
        </div>
        <div className="actions">
          <button type="button" className="btn" onClick={() => alert(dashboard.exportAlert)}>
            {dashboard.export}
          </button>
        </div>
      </div>
      {showPersonal && (
        <div className="tabs">
          <button
            type="button"
            className={`tab${tab === 'all' ? ' active' : ''}`}
            onClick={() => setTab('all')}
          >
            {dashboard.tabs.all}
          </button>
          <button
            type="button"
            className={`tab${tab === 'mine' ? ' active' : ''}`}
            onClick={() => setTab('mine')}
          >
            {dashboard.tabs.mine}
          </button>
        </div>
      )}
      {tab === 'mine' && personalStats ? (
        <PersonalStats stats={personalStats} populationStats={allStats} />
      ) : (
        <AggregatedStats stats={allStats} />
      )}
    </div>
  )
}

export default StatsDashboard
