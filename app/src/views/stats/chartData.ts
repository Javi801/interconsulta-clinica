import type { ColumnItem } from '../../components/charts/ColumnChart'
import type { DonutSegment } from '../../components/charts/Donut'
import type { BarItem } from '../../components/charts/MiniBars'
import { TEXT } from '../../text'
import type { ClinicalStats, PsychologistLoad, SymptomStat } from '../../utils/stats'

const { formStatus, referral, risk, weekdays } = TEXT.stats

/** Intensity scale used to map symptom averages to full column height. */
export const INTENSITY_MAX = 10

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

/** Weekday activity, Monday to Friday. */
export const activityColumns = (stats: ClinicalStats): ColumnItem[] =>
  weekdays.slice(0, 5).map((label, index) => ({ label, value: stats.weekdayActivity[index] }))

export const psychologistLoadBars = (loads: PsychologistLoad[]): BarItem[] =>
  loads.map((load) => ({ label: load.name, value: load.count, tone: 'default' }))
