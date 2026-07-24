import ColumnChart from '../../components/charts/ColumnChart'
import Donut from '../../components/charts/Donut'
import MiniBars from '../../components/charts/MiniBars'
import { TEXT } from '../../text'
import type { ClinicalStats } from '../../utils/stats'
import StatCard from './StatCard'
import {
  INTENSITY_MAX,
  overviewFormBars,
  overviewRiskBars,
  referralSegments,
  symptomColumns,
} from './chartData'

interface StatsOverviewProps {
  stats: ClinicalStats
  onOpenFull: () => void
}

const { overview, empty } = TEXT.stats

const percent = (value: number, total: number) => `${Math.round((value / total) * 100)}%`

function StatsOverview({ stats, onOpenFull }: StatsOverviewProps) {
  return (
    <div className="card full stats-overview">
      <div className="section-head">
        <div>
          <h2>{overview.title}</h2>
          <p>{overview.subtitle}</p>
        </div>
        <button type="button" className="btn primary" onClick={onOpenFull}>
          {overview.openFull}
        </button>
      </div>
      <div className="stats-grid">
        <StatCard title={overview.forms.title} number={stats.totalCases} meta={overview.forms.meta}>
          <MiniBars items={overviewFormBars(stats)} max={stats.totalCases} />
        </StatCard>
        <StatCard title={overview.referral.title} meta={overview.referral.meta}>
          <Donut segments={referralSegments(stats)} formatValue={percent} emptyLabel={empty} />
        </StatCard>
        <StatCard
          title={overview.risk.title}
          number={stats.highRiskCount}
          meta={overview.risk.meta}
        >
          <MiniBars items={overviewRiskBars(stats)} />
        </StatCard>
        <StatCard title={overview.symptoms.title} meta={overview.symptoms.meta}>
          <ColumnChart columns={symptomColumns(stats.symptoms, 4)} max={INTENSITY_MAX} emptyLabel={empty} />
        </StatCard>
      </div>
    </div>
  )
}

export default StatsOverview
