import Card, { SectionHead } from '../../components/Card'
import ColumnChart from '../../components/charts/ColumnChart'
import Donut from '../../components/charts/Donut'
import MiniBars from '../../components/charts/MiniBars'
import { TEXT } from '../../text'
import type { ClinicalStats } from '../../utils/stats'
import { activityColumns, personalLoadBars, referralSegments } from './chartData'

interface PersonalStatsProps {
  stats: ClinicalStats
}

const { personal, empty } = TEXT.stats

function alertLines(stats: ClinicalStats): string[] {
  const lines: string[] = []
  if (stats.highRiskCount > 0) lines.push(personal.alerts.highRisk(stats.highRiskCount))
  if (stats.pendingEvalCount > 0) lines.push(personal.alerts.pendingEval(stats.pendingEvalCount))
  if (stats.referral.derive > 0) lines.push(personal.alerts.derive(stats.referral.derive))
  return lines
}

function PersonalStats({ stats }: PersonalStatsProps) {
  const alerts = alertLines(stats)

  return (
    <>
      <div className="notice">{personal.notice}</div>
      <div className="grid">
        <Card span={6}>
          <SectionHead title={personal.load.title} subtitle={personal.load.subtitle} />
          <MiniBars items={personalLoadBars(stats)} max={stats.totalCases} />
        </Card>
        <Card span={6}>
          <SectionHead title={personal.alerts.title} subtitle={personal.alerts.subtitle} />
          <div className="summary-box">{alerts.length > 0 ? alerts.join('\n') : personal.alerts.none}</div>
        </Card>
        <Card span={6}>
          <SectionHead title={personal.referral.title} subtitle={personal.referral.subtitle} />
          <Donut segments={referralSegments(stats)} emptyLabel={empty} />
        </Card>
        <Card span={6}>
          <SectionHead title={personal.activity.title} subtitle={personal.activity.subtitle} />
          <ColumnChart columns={activityColumns(stats)} height={150} emptyLabel={empty} />
        </Card>
      </div>
    </>
  )
}

export default PersonalStats
