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

/** A named category with the number of cases it covers. */
export interface NameCount {
  name: string
  count: number
}

export interface SatisfactionAverages {
  work: number
  family: number
  couple: number
  selfCare: number
  /** Cases the averages are based on. */
  count: number
}

/** Diagnostic family keys; matched in order so qualifiers do not override the base family. */
const HYPOTHESIS_FAMILY_RULES: { family: string; pattern: RegExp }[] = [
  { family: 'bipolar', pattern: /bipolar|ciclotimia/i },
  { family: 'psychotic', pattern: /psic[oó]tic|esquizo/i },
  { family: 'substance', pattern: /consumo/i },
  { family: 'stress', pattern: /estr[eé]s|postraum|trauma/i },
  { family: 'adaptive', pattern: /adaptativo/i },
  { family: 'depressive', pattern: /depresiv|distimia/i },
  { family: 'anxiety', pattern: /ansied|ansios|p[aá]nico|fobia|agorafobia|obsesiv|\btoc\b/i },
]

const hypothesisFamily = (hypothesis: string): string =>
  HYPOTHESIS_FAMILY_RULES.find((rule) => rule.pattern.test(hypothesis))?.family ?? 'other'

const toNameCounts = (counts: Map<string, number>): NameCount[] =>
  [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

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
  /** Cases presenting each clinical risk, most frequent first. */
  riskTypes: NameCount[]
  /** Referral reasons, most frequent first. */
  referralReasons: NameCount[]
  /** Cases per diagnostic-hypothesis family, most frequent first. */
  hypothesisFamilies: NameCount[]
  /** Average life-satisfaction per dimension over cases with a sent patient form. */
  satisfaction: SatisfactionAverages
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

export function computeClinicalStats(patients: Patient[]): ClinicalStats {
  const patientFormStatus = emptyFormStatus()
  const psychFormStatus = emptyFormStatus()
  const referral: Record<ReferralOutcome, number> = { derive: 0, review: 0, notDerive: 0 }
  const risk: Record<RiskLevel, number> = { Bajo: 0, Moderado: 0, Alto: 0, Inminente: 0 }
  const symptomAcc = new Map<string, { count: number; sum: number }>()
  const domainAcc = new Map<string, { count: number; sum: number }>()
  const riskTypeAcc = new Map<string, number>()
  const referralReasonAcc = new Map<string, number>()
  const hypothesisFamilyAcc = new Map<string, number>()
  const satisfactionAcc = { work: 0, family: 0, couple: 0, selfCare: 0, count: 0 }
  const casePoints: CasePoint[] = []
  let pendingEvalCount = 0

  const bump = (map: Map<string, number>, key: string) => map.set(key, (map.get(key) ?? 0) + 1)

  for (const patient of patients) {
    patientFormStatus[patient.patientFormStatus] += 1
    psychFormStatus[patient.psychFormStatus] += 1

    if (patient.patientFormStatus === 'sent' && patient.psychFormStatus !== 'sent') {
      pendingEvalCount += 1
    }

    const patientForm = getSeedPatientForm(patient.rut)
    const psychForm = getSeedPsychForm(patient.rut)
    const level = highestRisk(psychForm.risks)
    if (level) risk[level] += 1

    for (const name of new Set(psychForm.risks.map((entry) => entry.risk))) bump(riskTypeAcc, name)
    for (const reason of psychForm.referralReasons) bump(referralReasonAcc, reason)
    for (const family of new Set(psychForm.hypotheses.map((entry) => hypothesisFamily(entry.hypothesis)))) {
      bump(hypothesisFamilyAcc, family)
    }

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

      const { work, family, couple, selfCare } = patientForm.satisfaction
      satisfactionAcc.work += work
      satisfactionAcc.family += family
      satisfactionAcc.couple += couple
      satisfactionAcc.selfCare += selfCare
      satisfactionAcc.count += 1
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

  const satisfactionCases = satisfactionAcc.count || 1
  const satisfaction: SatisfactionAverages = {
    work: satisfactionAcc.work / satisfactionCases,
    family: satisfactionAcc.family / satisfactionCases,
    couple: satisfactionAcc.couple / satisfactionCases,
    selfCare: satisfactionAcc.selfCare / satisfactionCases,
    count: satisfactionAcc.count,
  }

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
    riskTypes: toNameCounts(riskTypeAcc),
    referralReasons: toNameCounts(referralReasonAcc),
    hypothesisFamilies: toNameCounts(hypothesisFamilyAcc),
    satisfaction,
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
