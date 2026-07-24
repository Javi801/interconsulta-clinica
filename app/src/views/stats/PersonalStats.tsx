import Card, { SectionHead } from '../../components/Card'
import Donut from '../../components/charts/Donut'
import Heatmap from '../../components/charts/Heatmap'
import MiniBars from '../../components/charts/MiniBars'
import RadarChart from '../../components/charts/RadarChart'
import ScatterChart from '../../components/charts/ScatterChart'
import { TEXT } from '../../text'
import { DERIVE_THRESHOLD } from '../../utils/sadPersons'
import type { ClinicalStats } from '../../utils/stats'
import {
  INTENSITY_MAX,
  SCORE_MAX,
  densityColLabels,
  densityMatrix,
  densityRowLabels,
  hypothesisFamilyBars,
  nameCountBars,
  personalLoadBars,
  referralSegments,
  satisfactionBars,
  symptomRadarAxes,
  symptomRadarSeries,
  topCount,
  triageLegend,
  triagePoints,
  triageYLabels,
} from './chartData'

interface PersonalStatsProps {
  stats: ClinicalStats
  /** All cases, used as the reference profile in the symptom radar. */
  populationStats: ClinicalStats
}

const { personal, personalCharts, personalBreakdown, empty } = TEXT.stats

const SATISFACTION_MAX = 10

function alertLines(stats: ClinicalStats): string[] {
  const lines: string[] = []
  if (stats.highRiskCount > 0) lines.push(personal.alerts.highRisk(stats.highRiskCount))
  if (stats.pendingEvalCount > 0) lines.push(personal.alerts.pendingEval(stats.pendingEvalCount))
  if (stats.referral.derive > 0) lines.push(personal.alerts.derive(stats.referral.derive))
  return lines
}

function PersonalStats({ stats, populationStats }: PersonalStatsProps) {
  const alerts = alertLines(stats)

  return (
    <>
      <div className="notice">{personal.notice}</div>
      <div className="grid">
        <Card span={8}>
          <SectionHead title={personalCharts.triage.title} subtitle={personalCharts.triage.subtitle} />
          <ScatterChart
            points={triagePoints(stats.casePoints)}
            xMax={SCORE_MAX}
            yLabels={triageYLabels}
            xLabel={personalCharts.triage.scoreAxis}
            threshold={DERIVE_THRESHOLD}
            legend={triageLegend}
            emptyLabel={empty}
          />
        </Card>
        <Card span={4}>
          <SectionHead title={personalCharts.profile.title} subtitle={personalCharts.profile.subtitle} />
          <RadarChart
            axes={symptomRadarAxes(stats.symptomProfile)}
            series={symptomRadarSeries(stats.symptomProfile, populationStats.symptomProfile)}
            max={INTENSITY_MAX}
            emptyLabel={empty}
          />
        </Card>
        <Card span={6}>
          <SectionHead title={personalCharts.density.title} subtitle={personalCharts.density.subtitle} />
          <Heatmap
            rowLabels={densityRowLabels}
            colLabels={densityColLabels}
            matrix={densityMatrix(stats.casePoints)}
            emptyLabel={empty}
          />
        </Card>
        <Card span={6}>
          <SectionHead title={personal.referral.title} subtitle={personal.referral.subtitle} />
          <Donut segments={referralSegments(stats)} emptyLabel={empty} />
        </Card>
        <Card span={6}>
          <SectionHead
            title={personalBreakdown.riskTypes.title}
            subtitle={personalBreakdown.riskTypes.subtitle}
          />
          {stats.riskTypes.length > 0 ? (
            <MiniBars items={nameCountBars(stats.riskTypes)} max={topCount(stats.riskTypes)} layout="stacked" />
          ) : (
            <p className="subtitle">{empty}</p>
          )}
        </Card>
        <Card span={6}>
          <SectionHead
            title={personalBreakdown.referralReasons.title}
            subtitle={personalBreakdown.referralReasons.subtitle}
          />
          {stats.referralReasons.length > 0 ? (
            <MiniBars
              items={nameCountBars(stats.referralReasons)}
              max={topCount(stats.referralReasons)}
              layout="stacked"
            />
          ) : (
            <p className="subtitle">{empty}</p>
          )}
        </Card>
        <Card span={6}>
          <SectionHead
            title={personalBreakdown.hypotheses.title}
            subtitle={personalBreakdown.hypotheses.subtitle}
          />
          {stats.hypothesisFamilies.length > 0 ? (
            <MiniBars
              items={hypothesisFamilyBars(stats.hypothesisFamilies)}
              max={topCount(stats.hypothesisFamilies)}
            />
          ) : (
            <p className="subtitle">{empty}</p>
          )}
        </Card>
        <Card span={6}>
          <SectionHead
            title={personalBreakdown.satisfaction.title}
            subtitle={personalBreakdown.satisfaction.subtitle}
          />
          {stats.satisfaction.count > 0 ? (
            <MiniBars items={satisfactionBars(stats.satisfaction)} max={SATISFACTION_MAX} />
          ) : (
            <p className="subtitle">{empty}</p>
          )}
        </Card>
        <Card span={6}>
          <SectionHead title={personal.load.title} subtitle={personal.load.subtitle} />
          <MiniBars items={personalLoadBars(stats)} max={stats.totalCases} />
        </Card>
        <Card span={6}>
          <SectionHead title={personal.alerts.title} subtitle={personal.alerts.subtitle} />
          <div className="summary-box">{alerts.length > 0 ? alerts.join('\n') : personal.alerts.none}</div>
        </Card>
      </div>
    </>
  )
}

export default PersonalStats
