import { calculateAge, formatMonth } from './date'
import type { Medication, PatientForm } from '../types'

const EMPTY_SECTION = 'Sin registros.'

export function generalSummary(form: PatientForm): string {
  const general = form.general
  const age = calculateAge(general.birthDate)
  return [
    age !== null ? `Edad: ${age} años` : null,
    `Género: ${general.gender}`,
    `Nacionalidad: ${general.nationality}`,
    `Ocupación: ${general.occupations.join(', ')}`,
    `Detalle: ${general.occupationDetail}`,
    `Vive con: ${general.livesWith}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export function motiveSummary(form: PatientForm): string {
  const motive = form.motive
  return [
    `Motivo principal: ${motive.mainReason}`,
    `Desde cuándo ocurre: ${motive.since}`,
    `Qué espera obtener: ${motive.expectations}`,
  ].join('\n\n')
}

export function symptomsSummary(form: PatientForm): string {
  if (form.symptoms.length === 0) return EMPTY_SECTION
  return form.symptoms
    .map((symptom) => {
      const detail = symptom.observation ? ` (${symptom.observation})` : ''
      const onset = symptom.onset ? ` · inicio ${formatMonth(symptom.onset)}` : ''
      return `- ${symptom.name}${detail}: ${symptom.intensity}/10${onset} · ${symptom.course.toLowerCase()}`
    })
    .join('\n')
}

function medicationFrequency(medication: Medication): string {
  return medication.frequency === 'Otro' ? medication.frequencyDetail : medication.frequency
}

export function medicationsSummary(form: PatientForm): string {
  if (form.medications.length === 0) return EMPTY_SECTION
  return form.medications
    .map((medication) => {
      const times = medication.times.filter(Boolean).join(', ')
      return [
        [medication.name, medication.dose, medicationFrequency(medication), times]
          .filter(Boolean)
          .join(' · '),
        `Indicado por ${medication.prescribedBy}`,
        `Adherencia percibida: ${medication.adherence.toLowerCase()}`,
      ].join('\n')
    })
    .join('\n\n')
}

export function familyAndSubstancesSummary(form: PatientForm): string {
  const family =
    form.familyHistory.length === 0
      ? EMPTY_SECTION
      : form.familyHistory
          .map((entry) => `- ${entry.relationship}: ${entry.condition}, ${entry.type.toLowerCase()}`)
          .join('\n')
  const substances =
    form.substances.length === 0
      ? EMPTY_SECTION
      : form.substances
          .map((substance) => `- ${substance.substance}: ${substance.frequency} · ${substance.usualAmount}`)
          .join('\n')
  return `Antecedente familiar:\n${family}\n\nConsumo:\n${substances}`
}
