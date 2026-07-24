import { calculateAge } from './date'
import { TEXT } from '../text'
import type { ClinicalRisk, PatientForm, PsychForm, SadPersonsKey } from '../types'

const { suggestion } = TEXT.psych
const satisfactionLabels = TEXT.patient.satisfaction.fields

export type RiskBand = 'Bajo' | 'Moderado' | 'Alto' | 'Muy alto'
export type SadPersonsSource = 'patient' | 'psych' | 'both'

/** Every SAD PERSONS factor contributes the same weight when present. */
export const ITEM_WEIGHT = 1
/** Satisfaction at or below this (1–10 scale) is flagged as a gray-zone signal. */
const LOW_SATISFACTION = 5
/** Current symptoms at or above this intensity are flagged as a gray-zone signal. */
const HIGH_INTENSITY = 7

export interface SadPersonsItem {
  key: SadPersonsKey
  label: string
  source: SadPersonsSource
  /** Whether the factor is present and adds to the score. */
  scored: boolean
  /** Points added when scored. */
  weight: number
  note?: string
}

export interface SadPersonsResult {
  items: SadPersonsItem[]
  score: number
  maxScore: number
  band: RiskBand
  action: string
  /** True when the score reaches the referral threshold. */
  derive: boolean
}

/** A reported signal that lies outside the SAD PERSONS scale. */
export interface GrayZoneGroup {
  key: 'satisfaction' | 'substances' | 'antecedents' | 'events'
  title: string
  entries: string[]
}

/** Score at or above which a referral is suggested. */
export const DERIVE_THRESHOLD = 5

const NO_SPOUSE_STATUSES = ['Soltero/a', 'Separado/a', 'Divorciado/a', 'Viudo/a']
const PREVIOUS_ATTEMPT_CONDITION = 'Intento de suicidio previo'

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
  scored: boolean
  note?: string
}

function rawItems(patient: PatientForm, psych: PsychForm): RawItem[] {
  const { general, mentalHistory, physicalHistory } = patient
  const { risks, hypotheses } = psych
  const age = calculateAge(general.birthDate)

  return [
    {
      key: 'sex',
      source: 'patient',
      scored: general.gender === 'Hombre',
      note:
        general.gender !== 'Hombre' && general.gender !== 'Mujer'
          ? suggestion.genderNote
          : undefined,
    },
    { key: 'age', source: 'patient', scored: age !== null && (age <= 19 || age >= 45) },
    {
      key: 'depression',
      source: 'psych',
      scored: hypotheses.some((item) => isDepressiveHypothesis(item.hypothesis)),
    },
    {
      key: 'previous',
      source: 'both',
      scored:
        mentalHistory.some((item) => item.condition === PREVIOUS_ATTEMPT_CONDITION) ||
        hasRisk(risks, 'Intentos suicidas previos'),
    },
    {
      key: 'substances',
      source: 'psych',
      scored:
        hasRisk(risks, 'Consumo de sustancias con riesgo') ||
        hypotheses.some((item) => item.hypothesis === 'Consumo problemático de sustancias'),
    },
    { key: 'rational', source: 'psych', scored: hasRisk(risks, 'Síntomas psicóticos con riesgo') },
    { key: 'support', source: 'psych', scored: hasRisk(risks, 'Vulnerabilidad social') },
    {
      key: 'plan',
      source: 'psych',
      scored:
        hasRisk(risks, 'Plan suicida') || hasRisk(risks, 'Acceso a medios potencialmente letales'),
    },
    {
      key: 'noSpouse',
      source: 'patient',
      scored: NO_SPOUSE_STATUSES.includes(general.relationshipStatus),
    },
    { key: 'sickness', source: 'patient', scored: physicalHistory.some((item) => item.severe) },
  ]
}

/** Referral suggestion grouped into three actionable outcomes. */
export type ReferralOutcome = 'derive' | 'review' | 'notDerive'

/**
 * Collapses the SAD PERSONS band into a three-way referral outcome.
 * Bajo -> no referral; Moderado -> needs review; Alto/Muy alto -> refer.
 * Consistent with {@link SadPersonsResult.derive} (Alto/Muy alto reach the threshold).
 */
export function referralOutcome(result: SadPersonsResult): ReferralOutcome {
  if (result.band === 'Bajo') return 'notDerive'
  if (result.band === 'Moderado') return 'review'
  return 'derive'
}

export function computeSadPersons(patient: PatientForm, psych: PsychForm): SadPersonsResult {
  const items: SadPersonsItem[] = rawItems(patient, psych).map((item) => ({
    key: item.key,
    label: suggestion.items[item.key],
    source: item.source,
    scored: item.scored,
    weight: ITEM_WEIGHT,
    note: item.note,
  }))

  const score = items.reduce((total, item) => (item.scored ? total + item.weight : total), 0)
  const maxScore = items.reduce((total, item) => total + item.weight, 0)
  const band = resolveBand(score)
  return { items, score, maxScore, band, action: suggestion.actions[band], derive: score >= DERIVE_THRESHOLD }
}

/**
 * Signals reported in either form that the SAD PERSONS scale does not weigh.
 * They do not change the score; they are surfaced as clinical context.
 */
export function computeGrayZone(patient: PatientForm, psych: PsychForm): GrayZoneGroup[] {
  const { grayZone } = suggestion
  const substancesScored = rawItems(patient, psych).find((item) => item.key === 'substances')?.scored

  const satisfactionEntries = (
    Object.keys(patient.satisfaction) as (keyof typeof patient.satisfaction)[]
  )
    .filter((dimension) => patient.satisfaction[dimension] <= LOW_SATISFACTION)
    .map((dimension) =>
      grayZone.satisfactionLine(satisfactionLabels[dimension], patient.satisfaction[dimension]),
    )

  const substanceEntries = substancesScored
    ? []
    : patient.substances.map((entry) => grayZone.substanceLine(entry.substance))

  const antecedentEntries = [
    ...patient.familyHistory.map((entry) =>
      grayZone.familyLine(entry.condition, entry.relationship),
    ),
    ...patient.mentalHistory
      .filter((entry) => entry.condition !== PREVIOUS_ATTEMPT_CONDITION)
      .map((entry) => grayZone.historyLine(entry.condition)),
    ...patient.physicalHistory
      .filter((entry) => !entry.severe)
      .map((entry) => grayZone.historyLine(entry.condition)),
  ]

  const eventEntries = [
    ...patient.lifeEvents.map((entry) => grayZone.eventLine(entry.category)),
    ...patient.symptoms
      .filter((symptom) => symptom.intensity >= HIGH_INTENSITY)
      .map((symptom) => grayZone.symptomLine(symptom.name, symptom.intensity)),
  ]

  return [
    { key: 'satisfaction' as const, title: grayZone.groups.satisfaction, entries: satisfactionEntries },
    { key: 'substances' as const, title: grayZone.groups.substances, entries: substanceEntries },
    { key: 'antecedents' as const, title: grayZone.groups.antecedents, entries: antecedentEntries },
    { key: 'events' as const, title: grayZone.groups.events, entries: eventEntries },
  ].filter((group) => group.entries.length > 0)
}
