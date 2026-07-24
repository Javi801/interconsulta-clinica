import Donut from '../../components/charts/Donut'
import MiniBars from '../../components/charts/MiniBars'
import { TEXT } from '../../text'
import type { ClinicalStats, PsychologistLoad } from '../../utils/stats'
import StatCard from './StatCard'
import StatsOverview from './StatsOverview'
import {
  donutPercent,
  overviewFormBars,
  overviewRiskBars,
  psychologistLoadBars,
  referralSegments,
} from './chartData'

interface CoordinatorStatsOverviewProps {
  stats: ClinicalStats
  loads: PsychologistLoad[]
  onOpenFull: () => void
}

const { overview, empty } = TEXT.stats
const { coordinator } = overview

function CoordinatorStatsOverview({ stats, loads, onOpenFull }: CoordinatorStatsOverviewProps) {
  return (
    <StatsOverview subtitle={overview.subtitle} onOpenFull={onOpenFull}>
      <StatCard title={coordinator.forms.title} number={stats.totalCases} meta={coordinator.forms.meta}>
        <MiniBars items={overviewFormBars(stats)} max={stats.totalCases} />
      </StatCard>
      <StatCard title={coordinator.byPsychologist.title} meta={coordinator.byPsychologist.meta}>
        <MiniBars items={psychologistLoadBars(loads)} max={stats.totalCases} />
      </StatCard>
      <StatCard title={coordinator.referral.title} meta={coordinator.referral.meta}>
        <Donut segments={referralSegments(stats)} formatValue={donutPercent} emptyLabel={empty} />
      </StatCard>
      <StatCard title={coordinator.risk.title} number={stats.highRiskCount} meta={coordinator.risk.meta}>
        <MiniBars items={overviewRiskBars(stats)} />
      </StatCard>
    </StatsOverview>
  )
}

export default CoordinatorStatsOverview
