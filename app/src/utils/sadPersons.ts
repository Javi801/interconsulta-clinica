import { calculateAge } from './date'
import { TEXT } from '../text'
import type { ClinicalRisk, PatientForm, PsychForm, SadPersonsKey } from '../types'

const { suggestion } = TEXT.psych

export type RiskBand = 'Bajo' | 'Moderado' | 'Alto' | 'Muy alto'
export type SadPersonsSource = 'patient' | 'psych' | 'both'

export interface SadPersonsItem {
  key: SadPersonsKey
  label: string
  source: SadPersonsSource
  /** Value derived from the forms, before any manual override. */
  auto: boolean
  /** Final value after applying the psychologist's override. */
  scored: boolean
  overridden: boolean
  note?: string
}

export interface SadPersonsResult {
  items: SadPersonsItem[]
  score: number
  band: RiskBand
  action: string
}

/** Score at or above which a referral is suggested. */
export const DERIVE_THRESHOLD = 5

const NO_SPOUSE_STATUSES = ['Soltero/a', 'Separado/a', 'Divorciado/a', 'Viudo/a']

const hasRisk = (risks: ClinicalRisk[], name: string): boolean =>
  risks.some((risk) => risk.risk === name)

const isDepressiveHypothesis = (hypothesis: string): boolean =>
  /depresiv/i.test(hypothesis) || /distimia/i.test(hypothesis)

function resolveBand(score: number): RiskBand {
  if (score <= 2) return 'Bajo'
  if (score <= 4) return 'Moderado'
  if (score <= 6) return 'Alto'
  return 'Muy alto'
}

interface RawItem {
  key: SadPersonsKey
  source: SadPersonsSource
  auto: boolean
  note?: string
}

export function computeSadPersons(patient: PatientForm, psych: PsychForm): SadPersonsResult {
  const { general, mentalHistory, physicalHistory } = patient
  const { risks, hypotheses, sadPersonsOverrides } = psych
  const age = calculateAge(general.birthDate)

  const raw: RawItem[] = [
    {
      key: 'sex',
      source: 'patient',
      auto: general.gender === 'Hombre',
      note:
        general.gender !== 'Hombre' && general.gender !== 'Mujer'
          ? suggestion.genderNote
          : undefined,
    },
    { key: 'age', source: 'patient', auto: age !== null && (age <= 19 || age >= 45) },
    {
      key: 'depression',
      source: 'psych',
      auto: hypotheses.some((item) => isDepressiveHypothesis(item.hypothesis)),
    },
    {
      key: 'previous',
      source: 'both',
      auto:
        mentalHistory.some((item) => item.condition === 'Intento de suicidio previo') ||
        hasRisk(risks, 'Intentos suicidas previos'),
    },
    {
      key: 'substances',
      source: 'psych',
      auto:
        hasRisk(risks, 'Consumo de sustancias con riesgo') ||
        hypotheses.some((item) => item.hypothesis === 'Consumo problemático de sustancias'),
    },
    { key: 'rational', source: 'psych', auto: hasRisk(risks, 'Síntomas psicóticos con riesgo') },
    { key: 'support', source: 'psych', auto: hasRisk(risks, 'Vulnerabilidad social') },
    {
      key: 'plan',
      source: 'psych',
      auto:
        hasRisk(risks, 'Plan suicida') || hasRisk(risks, 'Acceso a medios potencialmente letales'),
    },
    {
      key: 'noSpouse',
      source: 'patient',
      auto: NO_SPOUSE_STATUSES.includes(general.relationshipStatus),
    },
    { key: 'sickness', source: 'patient', auto: physicalHistory.some((item) => item.severe) },
  ]

  const items: SadPersonsItem[] = raw.map((item) => {
    const override = sadPersonsOverrides[item.key]
    const scored = override ?? item.auto
    return {
      key: item.key,
      label: suggestion.items[item.key],
      source: item.source,
      auto: item.auto,
      scored,
      overridden: override !== undefined && override !== item.auto,
      note: item.note,
    }
  })

  const score = items.filter((item) => item.scored).length
  const band = resolveBand(score)
  return { items, score, band, action: suggestion.actions[band] }
}
