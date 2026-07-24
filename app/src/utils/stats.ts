import { getSeedPatientForm, getSeedPsychForm } from '../seed/demoData'
import { SYMPTOM_OPTIONS } from '../text'
import type { ClinicalRisk, FormStatus, Patient, Psychologist, RiskLevel } from '../types'
import { computeSadPersons, referralOutcome, type ReferralOutcome } from './sadPersons'

export interface SymptomStat {
  name: string
  /** Number of cases that reported the symptom. */
  count: number
  averageIntensity: number
}

/** Average reported intensity for a fixed symptom domain, comparable across scopes. */
export interface SymptomDomainStat {
  domain: string
  averageIntensity: number
  count: number
}

/** One case reduced to the dimensions plotted in the triage scatter and density map. */
export interface CasePoint {
  rut: string
  score: number
  maxRisk: RiskLevel | null
  symptomCount: number
  referral: ReferralOutcome
}

/** Canonical symptom domains (SYMPTOM_OPTIONS without the free "other" bucket). */
const SYMPTOM_DOMAINS = SYMPTOM_OPTIONS.filter((option) => option !== 'Otros síntomas')

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const DOMAIN_BY_NORM = new Map(SYMPTOM_DOMAINS.map((domain) => [normalize(domain), domain]))

const domainOf = (name: string): string | null => DOMAIN_BY_NORM.get(normalize(name)) ?? null

export interface ClinicalStats {
  totalCases: number
  patientFormStatus: Record<FormStatus, number>
  psychFormStatus: Record<FormStatus, number>
  /** Referral outcome distribution over cases with a sent patient form. */
  referral: Record<ReferralOutcome, number>
  referralTotal: number
  /** Highest risk level recorded per case, over cases with any risk. */
  risk: Record<RiskLevel, number>
  /** Cases whose highest risk is Alto or Inminente. */
  highRiskCount: number
  /** Sent patient forms still awaiting a submitted psychologist evaluation. */
  pendingEvalCount: number
  /** Symptoms ordered by frequency, then average intensity. */
  symptoms: SymptomStat[]
  /** Average intensity per canonical symptom domain, fixed order for comparison. */
  symptomProfile: SymptomDomainStat[]
  /** One point per case with a sent patient form. */
  casePoints: CasePoint[]
  /** Case updates grouped by weekday, Monday (0) to Sunday (6). */
  weekdayActivity: number[]
}

const RISK_ORDER: RiskLevel[] = ['Bajo', 'Moderado', 'Alto', 'Inminente']

const emptyFormStatus = (): Record<FormStatus, number> => ({
  draft: 0,
  pending: 0,
  sent: 0,
  'not-sent': 0,
})

function highestRisk(risks: ClinicalRisk[]): RiskLevel | null {
  let best = -1
  for (const risk of risks) best = Math.max(best, RISK_ORDER.indexOf(risk.level))
  return best >= 0 ? RISK_ORDER[best] : null
}

/** Maps a 'dd/mm/yyyy' date to a Monday-based weekday index, or null if unparseable. */
function weekdayIndex(updatedAt: string): number | null {
  const match = updatedAt.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!match) return null
  const [, day, month, year] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  if (Number.isNaN(date.getTime())) return null
  return (date.getDay() + 6) % 7
}

export function computeClinicalStats(patients: Patient[]): ClinicalStats {
  const patientFormStatus = emptyFormStatus()
  const psychFormStatus = emptyFormStatus()
  const referral: Record<ReferralOutcome, number> = { derive: 0, review: 0, notDerive: 0 }
  const risk: Record<RiskLevel, number> = { Bajo: 0, Moderado: 0, Alto: 0, Inminente: 0 }
  const symptomAcc = new Map<string, { count: number; sum: number }>()
  const domainAcc = new Map<string, { count: number; sum: number }>()
  const casePoints: CasePoint[] = []
  const weekdayActivity = [0, 0, 0, 0, 0, 0, 0]
  let pendingEvalCount = 0

  for (const patient of patients) {
    patientFormStatus[patient.patientFormStatus] += 1
    psychFormStatus[patient.psychFormStatus] += 1

    if (patient.patientFormStatus === 'sent' && patient.psychFormStatus !== 'sent') {
      pendingEvalCount += 1
    }

    const weekday = weekdayIndex(patient.updatedAt)
    if (weekday !== null) weekdayActivity[weekday] += 1

    const patientForm = getSeedPatientForm(patient.rut)
    const psychForm = getSeedPsychForm(patient.rut)
    const level = highestRisk(psychForm.risks)
    if (level) risk[level] += 1

    if (patient.patientFormStatus === 'sent') {
      const sad = computeSadPersons(patientForm, psychForm)
      const outcome = referralOutcome(sad)
      referral[outcome] += 1
      casePoints.push({
        rut: patient.rut,
        score: sad.score,
        maxRisk: level,
        symptomCount: patientForm.symptoms.length,
        referral: outcome,
      })
    }

    for (const symptom of patientForm.symptoms) {
      const acc = symptomAcc.get(symptom.name) ?? { count: 0, sum: 0 }
      acc.count += 1
      acc.sum += symptom.intensity
      symptomAcc.set(symptom.name, acc)

      const domain = domainOf(symptom.name)
      if (domain) {
        const domainStat = domainAcc.get(domain) ?? { count: 0, sum: 0 }
        domainStat.count += 1
        domainStat.sum += symptom.intensity
        domainAcc.set(domain, domainStat)
      }
    }
  }

  const symptoms = [...symptomAcc.entries()]
    .map(([name, { count, sum }]) => ({ name, count, averageIntensity: sum / count }))
    .sort((a, b) => b.count - a.count || b.averageIntensity - a.averageIntensity)

  const symptomProfile = SYMPTOM_DOMAINS.map((domain) => {
    const acc = domainAcc.get(domain)
    return {
      domain,
      count: acc?.count ?? 0,
      averageIntensity: acc ? acc.sum / acc.count : 0,
    }
  })

  return {
    totalCases: patients.length,
    patientFormStatus,
    psychFormStatus,
    referral,
    referralTotal: referral.derive + referral.review + referral.notDerive,
    risk,
    highRiskCount: risk.Alto + risk.Inminente,
    pendingEvalCount,
    symptoms,
    symptomProfile,
    casePoints,
    weekdayActivity,
  }
}

export interface PsychologistLoad {
  id: string
  name: string
  count: number
}

/** Assigned-case count per psychologist, ordered from most to least loaded. */
export function computePsychologistLoads(
  patients: Patient[],
  psychologists: Psychologist[],
): PsychologistLoad[] {
  const counts = new Map<string, number>()
  for (const patient of patients) {
    counts.set(patient.assignedPsychologistId, (counts.get(patient.assignedPsychologistId) ?? 0) + 1)
  }
  return psychologists
    .map((psychologist) => ({
      id: psychologist.id,
      name: psychologist.name,
      count: counts.get(psychologist.id) ?? 0,
    }))
    .sort((a, b) => b.count - a.count)
}
