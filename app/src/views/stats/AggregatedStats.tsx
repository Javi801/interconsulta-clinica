import Card, { SectionHead } from '../../components/Card'
import ColumnChart from '../../components/charts/ColumnChart'
import Donut from '../../components/charts/Donut'
import MiniBars from '../../components/charts/MiniBars'
import { TEXT } from '../../text'
import type { ClinicalStats } from '../../utils/stats'
import { INTENSITY_MAX, dashboardFormBars, referralSegments, riskBars, symptomColumns } from './chartData'

interface AggregatedStatsProps {
  stats: ClinicalStats
}

const { aggregated, empty } = TEXT.stats

function AggregatedStats({ stats }: AggregatedStatsProps) {
  return (
    <>
      <div className="notice">{aggregated.notice}</div>
      <div className="grid">
        <Card span={6}>
          <SectionHead title={aggregated.formStatus.title} subtitle={aggregated.formStatus.subtitle} />
          <MiniBars items={dashboardFormBars(stats)} max={stats.totalCases} />
        </Card>
        <Card span={6}>
          <SectionHead title={aggregated.referral.title} subtitle={aggregated.referral.subtitle} />
          <Donut segments={referralSegments(stats)} emptyLabel={empty} />
        </Card>
        <Card span={6}>
          <SectionHead title={aggregated.risk.title} subtitle={aggregated.risk.subtitle} />
          <MiniBars items={riskBars(stats)} />
        </Card>
        <Card span={6}>
          <SectionHead title={aggregated.symptoms.title} subtitle={aggregated.symptoms.subtitle} />
          <ColumnChart
            columns={symptomColumns(stats.symptoms, 5)}
            max={INTENSITY_MAX}
            height={150}
            emptyLabel={empty}
          />
        </Card>
      </div>
    </>
  )
}

export default AggregatedStats
