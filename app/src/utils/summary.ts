import { calculateAge, formatMonth } from './date'
import { computeSadPersons, DERIVE_THRESHOLD } from './sadPersons'
import { TEXT } from '../text'
import type { Medication, PatientForm, PsychForm } from '../types'

const { summary } = TEXT

export function generalSummary(form: PatientForm): string {
  const general = form.general
  const age = calculateAge(general.birthDate)
  return [
    age !== null ? summary.general.age(age) : null,
    summary.general.gender(general.gender),
    summary.general.nationality(general.nationality),
    summary.general.occupation(general.occupations.join(', ')),
    summary.general.detail(general.occupationDetail),
    summary.general.livesWith(general.livesWith),
  ]
    .filter(Boolean)
    .join('\n')
}

export function motiveSummary(form: PatientForm): string {
  const motive = form.motive
  return [
    summary.motive.mainReason(motive.mainReason),
    summary.motive.since(motive.since),
    summary.motive.expectations(motive.expectations),
  ].join('\n\n')
}

export function symptomsSummary(form: PatientForm): string {
  if (form.symptoms.length === 0) return summary.emptySection
  return form.symptoms
    .map((symptom) =>
      summary.symptom.line(
        symptom.name,
        symptom.intensity,
        symptom.onset ? formatMonth(symptom.onset) : '',
        symptom.course.toLowerCase(),
        symptom.observation,
      ),
    )
    .join('\n')
}

function medicationFrequency(medication: Medication): string {
  return medication.frequency === 'Otro' ? medication.frequencyDetail : medication.frequency
}

export function medicationsSummary(form: PatientForm): string {
  if (form.medications.length === 0) return summary.emptySection
  return form.medications
    .map((medication) => {
      const times = medication.times.filter(Boolean).join(', ')
      return [
        [medication.name, medication.dose, medicationFrequency(medication), times]
          .filter(Boolean)
          .join(' · '),
        summary.medication.prescribedBy(medication.prescribedBy),
        summary.medication.adherence(medication.adherence.toLowerCase()),
      ].join('\n')
    })
    .join('\n\n')
}

export function referralSuggestion(psychForm: PsychForm): string {
  return psychForm.score >= psychForm.threshold
    ? summary.suggestion.derive
    : summary.suggestion.notDerive
}

export function simpleSummary(patientForm: PatientForm, psychForm: PsychForm): string {
  const symptoms =
    patientForm.symptoms.length === 0
      ? summary.emptySection
      : patientForm.symptoms
          .map((symptom) => summary.symptom.simpleLine(symptom.name, symptom.intensity))
          .join('\n')
  const sad = computeSadPersons(patientForm, psychForm)
  return [
    `${summary.simple.generalHeading}\n${generalSummary(patientForm)}`,
    `${summary.simple.symptomsHeading}\n${symptoms}`,
    `${summary.simple.suggestionHeading}\n- ${referralSuggestion(psychForm)}\n- ${summary.simple.score(psychForm.score)}`,
  ].join('\n\n')
}

export function familyAndSubstancesSummary(form: PatientForm): string {
  const family =
    form.familyHistory.length === 0
      ? summary.emptySection
      : form.familyHistory
          .map((entry) =>
            summary.family.line(entry.relationship, entry.condition, entry.type.toLowerCase()),
          )
          .join('\n')
  const substances =
    form.substances.length === 0
      ? summary.emptySection
      : form.substances
          .map((substance) =>
            summary.substance.line(substance.substance, substance.frequency, substance.usualAmount),
          )
          .join('\n')
  return summary.familyAndSubstances(family, substances)
}
