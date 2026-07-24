import { getSeedPatientForm, getSeedPsychForm } from '../seed/demoData'
import type { ClinicalRisk, FormStatus, Patient, RiskLevel } from '../types'
import { computeSadPersons, referralOutcome, type ReferralOutcome } from './sadPersons'

export interface SymptomStat {
  name: string
  /** Number of cases that reported the symptom. */
  count: number
  averageIntensity: number
}

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

    if (patient.patientFormStatus === 'sent') {
      referral[referralOutcome(computeSadPersons(patientForm, psychForm))] += 1
    }

    const level = highestRisk(psychForm.risks)
    if (level) risk[level] += 1

    for (const symptom of patientForm.symptoms) {
      const acc = symptomAcc.get(symptom.name) ?? { count: 0, sum: 0 }
      acc.count += 1
      acc.sum += symptom.intensity
      symptomAcc.set(symptom.name, acc)
    }
  }

  const symptoms = [...symptomAcc.entries()]
    .map(([name, { count, sum }]) => ({ name, count, averageIntensity: sum / count }))
    .sort((a, b) => b.count - a.count || b.averageIntensity - a.averageIntensity)

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
    weekdayActivity,
  }
}
