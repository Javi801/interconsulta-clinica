import type { ColumnItem } from '../../components/charts/ColumnChart'
import type { DonutSegment } from '../../components/charts/Donut'
import type { BarItem, BarTone } from '../../components/charts/MiniBars'
import type { RadarSeries } from '../../components/charts/RadarChart'
import type { ScatterPoint, ScatterTone } from '../../components/charts/ScatterChart'
import { TEXT } from '../../text'
import type { ReferralOutcome } from '../../utils/sadPersons'
import type {
  CasePoint,
  ClinicalStats,
  NameCount,
  PsychologistLoad,
  SatisfactionAverages,
  SymptomDomainStat,
  SymptomStat,
} from '../../utils/stats'
import type { RiskLevel } from '../../types'

const {
  formStatus,
  referral,
  risk,
  personalCharts,
  symptomShort,
  hypothesisFamilies,
  satisfactionShort,
} = TEXT.stats

/** Intensity scale used to map symptom averages to full column height. */
export const INTENSITY_MAX = 10

/** Maximum SAD PERSONS score (one point per factor). */
export const SCORE_MAX = 10

export const donutPercent = (value: number, total: number) => `${Math.round((value / total) * 100)}%`

export const referralSegments = (stats: ClinicalStats): DonutSegment[] => [
  { label: referral.derive, value: stats.referral.derive, tone: 'success' },
  { label: referral.review, value: stats.referral.review, tone: 'warning' },
  { label: referral.notDerive, value: stats.referral.notDerive, tone: 'info' },
]

export const symptomColumns = (symptoms: SymptomStat[], limit: number): ColumnItem[] =>
  symptoms.slice(0, limit).map((symptom) => ({ label: symptom.name, value: symptom.averageIntensity }))

/** Compact patient-form distribution for the overview card. */
export const overviewFormBars = (stats: ClinicalStats): BarItem[] => [
  { label: formStatus.sent, value: stats.patientFormStatus.sent, tone: 'success' },
  { label: formStatus.notSent, value: stats.patientFormStatus['not-sent'], tone: 'warning' },
  { label: formStatus.draft, value: stats.patientFormStatus.draft, tone: 'default' },
]

/** Patient and psychologist form progress side by side. */
export const dashboardFormBars = (stats: ClinicalStats): BarItem[] => [
  { label: formStatus.patientSent, value: stats.patientFormStatus.sent, tone: 'success' },
  {
    label: formStatus.patientPending,
    value: stats.totalCases - stats.patientFormStatus.sent,
    tone: 'danger',
  },
  { label: formStatus.psychSent, value: stats.psychFormStatus.sent, tone: 'success' },
  {
    label: formStatus.psychPending,
    value: stats.totalCases - stats.psychFormStatus.sent,
    tone: 'warning',
  },
]

/** Three-band risk summary for the overview card. */
export const overviewRiskBars = (stats: ClinicalStats): BarItem[] => [
  { label: risk.Bajo, value: stats.risk.Bajo, tone: 'success' },
  { label: risk.Moderado, value: stats.risk.Moderado, tone: 'warning' },
  { label: risk.highCombined, value: stats.highRiskCount, tone: 'danger' },
]

/** Full four-level risk distribution. */
export const riskBars = (stats: ClinicalStats): BarItem[] => [
  { label: risk.Bajo, value: stats.risk.Bajo, tone: 'success' },
  { label: risk.Moderado, value: stats.risk.Moderado, tone: 'warning' },
  { label: risk.Alto, value: stats.risk.Alto, tone: 'danger' },
  { label: risk.Inminente, value: stats.risk.Inminente, tone: 'danger' },
]

export const personalLoadBars = (stats: ClinicalStats): BarItem[] => [
  { label: TEXT.stats.personal.load.toReview, value: stats.psychFormStatus.pending, tone: 'warning' },
  { label: TEXT.stats.personal.load.drafts, value: stats.psychFormStatus.draft, tone: 'default' },
  { label: TEXT.stats.personal.load.sent, value: stats.psychFormStatus.sent, tone: 'success' },
]

export const psychologistLoadBars = (loads: PsychologistLoad[]): BarItem[] =>
  loads.map((load) => ({ label: load.name, value: load.count, tone: 'default' }))

// --- New-primitive charts (triage scatter, symptom radar, score×risk density) ---

const REFERRAL_TONE: Record<ReferralOutcome, ScatterTone> = {
  derive: 'success',
  review: 'warning',
  notDerive: 'info',
}

/** Scatter row index per risk level; 0 is reserved for cases without recorded risk. */
const RISK_ROW: Record<RiskLevel, number> = { Bajo: 1, Moderado: 2, Alto: 3, Inminente: 4 }

/** Triage y-axis, bottom to top. */
export const triageYLabels = [
  personalCharts.triage.noRisk,
  risk.Bajo,
  risk.Moderado,
  risk.Alto,
  risk.Inminente,
]

export const triageLegend: { label: string; tone: ScatterTone }[] = [
  { label: referral.derive, tone: 'success' },
  { label: referral.review, tone: 'warning' },
  { label: referral.notDerive, tone: 'info' },
]

export const triagePoints = (casePoints: CasePoint[]): ScatterPoint[] =>
  casePoints.map((point) => ({
    x: point.score,
    y: point.maxRisk ? RISK_ROW[point.maxRisk] : 0,
    size: point.symptomCount,
    tone: REFERRAL_TONE[point.referral],
    title: `${point.rut} · ${point.score} pts`,
  }))

const shortLabel = symptomShort as Record<string, string>

export const symptomRadarAxes = (profile: SymptomDomainStat[]): string[] =>
  profile.map((point) => shortLabel[point.domain] ?? point.domain)

export const symptomRadarSeries = (
  own: SymptomDomainStat[],
  all: SymptomDomainStat[],
): RadarSeries[] => [
  { label: personalCharts.profile.all, values: all.map((point) => point.averageIntensity), tone: 'primary' },
  { label: personalCharts.profile.mine, values: own.map((point) => point.averageIntensity), tone: 'accent' },
]

/** Density rows, top (most severe) to bottom. */
const DENSITY_ROWS: (RiskLevel | 'none')[] = ['Inminente', 'Alto', 'Moderado', 'Bajo', 'none']

export const densityRowLabels = [
  risk.Inminente,
  risk.Alto,
  risk.Moderado,
  risk.Bajo,
  personalCharts.triage.noRisk,
]

export const densityColLabels = [...personalCharts.density.scoreBands]

const scoreBand = (score: number): number => (score <= 2 ? 0 : score <= 4 ? 1 : score <= 6 ? 2 : 3)

export const densityMatrix = (casePoints: CasePoint[]): number[][] => {
  const matrix = DENSITY_ROWS.map(() => Array<number>(densityColLabels.length).fill(0))
  for (const point of casePoints) {
    const row = DENSITY_ROWS.indexOf(point.maxRisk ?? 'none')
    matrix[row][scoreBand(point.score)] += 1
  }
  return matrix
}

// --- Personal clinical breakdowns (existing MiniBars primitive) ---

/** Ranked frequency list. Pass `max = topCount(items)` to MiniBars so the leader fills the bar. */
export const nameCountBars = (items: NameCount[], limit = 6): BarItem[] =>
  items.slice(0, limit).map((item) => ({ label: item.name, value: item.count, tone: 'default' }))

/** Largest count in a ranked list (already sorted desc), or 1 when empty. */
export const topCount = (items: NameCount[]): number => items[0]?.count ?? 1

const familyLabel = hypothesisFamilies as Record<string, string>

export const hypothesisFamilyBars = (items: NameCount[]): BarItem[] =>
  items.map((item) => ({ label: familyLabel[item.name] ?? item.name, value: item.count, tone: 'default' }))

const satisfactionTone = (value: number): BarTone =>
  value <= 3 ? 'danger' : value <= 5 ? 'warning' : 'success'

export const satisfactionBars = (satisfaction: SatisfactionAverages): BarItem[] =>
  (['work', 'family', 'couple', 'selfCare'] as const).map((key) => ({
    label: satisfactionShort[key],
    value: Math.round(satisfaction[key] * 10) / 10,
    tone: satisfactionTone(satisfaction[key]),
  }))
