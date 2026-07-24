import ColumnChart from '../../components/charts/ColumnChart'
import Donut from '../../components/charts/Donut'
import MiniBars from '../../components/charts/MiniBars'
import { TEXT } from '../../text'
import type { ClinicalStats } from '../../utils/stats'
import StatCard from './StatCard'
import StatsOverview from './StatsOverview'
import {
  INTENSITY_MAX,
  donutPercent,
  overviewRiskBars,
  personalLoadBars,
  referralSegments,
  symptomColumns,
} from './chartData'

interface PsychStatsOverviewProps {
  stats: ClinicalStats
  onOpenFull: () => void
}

const { overview, empty } = TEXT.stats
const { psych } = overview

function PsychStatsOverview({ stats, onOpenFull }: PsychStatsOverviewProps) {
  return (
    <StatsOverview subtitle={overview.subtitlePersonal} onOpenFull={onOpenFull}>
      <StatCard title={psych.load.title} number={stats.pendingEvalCount} meta={psych.load.meta}>
        <MiniBars items={personalLoadBars(stats)} max={stats.totalCases} />
      </StatCard>
      <StatCard title={psych.referral.title} meta={psych.referral.meta}>
        <Donut segments={referralSegments(stats)} formatValue={donutPercent} emptyLabel={empty} />
      </StatCard>
      <StatCard title={psych.risk.title} number={stats.highRiskCount} meta={psych.risk.meta}>
        <MiniBars items={overviewRiskBars(stats)} />
      </StatCard>
      <StatCard title={psych.symptoms.title} meta={psych.symptoms.meta}>
        <ColumnChart columns={symptomColumns(stats.symptoms, 4)} max={INTENSITY_MAX} emptyLabel={empty} />
      </StatCard>
    </StatsOverview>
  )
}

export default PsychStatsOverview
