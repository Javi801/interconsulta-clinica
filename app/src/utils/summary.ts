import { calculateAge, formatMonth } from './date'
import { computeSadPersons, DERIVE_THRESHOLD } from './sadPersons'
import { TEXT } from '../text'
import type {
  ConditionRef,
  Medication,
  PatientForm,
  PersonalHistoryBase,
  PsychForm,
} from '../types'

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

function conditionLabel(form: PatientForm, ref: ConditionRef | null): string | null {
  if (!ref) return null
  const list = ref.source === 'mental' ? form.mentalHistory : form.physicalHistory
  return list.find((entry) => entry.id === ref.id)?.condition ?? null
}

export function medicationsSummary(form: PatientForm): string {
  if (form.medications.length === 0) return summary.emptySection
  return form.medications
    .map((medication) => {
      const indication = conditionLabel(form, medication.linkedCondition)
      const lines: string[] = []
      if (medication.status === 'Pasado') {
        const header = `${medication.name} (${summary.medication.pastTag})`
        lines.push([header, medication.period].filter(Boolean).join(' · '))
      } else {
        const times = medication.times.filter(Boolean).join(', ')
        lines.push(
          [medication.name, medication.dose, medicationFrequency(medication), times]
            .filter(Boolean)
            .join(' · '),
        )
        lines.push(summary.medication.adherence(medication.adherence.toLowerCase()))
      }
      lines.push(summary.medication.prescribedBy(medication.prescribedBy))
      if (indication) lines.push(summary.medication.indication(indication))
      return lines.join('\n')
    })
    .join('\n\n')
}

export function simpleSummary(patientForm: PatientForm, psychForm: PsychForm): string {
  const symptoms =
    patientForm.symptoms.length === 0
      ? summary.emptySection
      : patientForm.symptoms
          .map((symptom) => summary.symptom.simpleLine(symptom.name, symptom.intensity))
          .join('\n')
  const sad = computeSadPersons(patientForm, psychForm)
  const derive =
    sad.score >= DERIVE_THRESHOLD ? summary.suggestion.derive : summary.suggestion.notDerive
  return [
    `${summary.simple.generalHeading}\n${generalSummary(patientForm)}`,
    `${summary.simple.symptomsHeading}\n${symptoms}`,
    `${summary.simple.suggestionHeading}\n- ${derive}\n- ${summary.simple.score(sad.score)} (${sad.band})\n- ${sad.action}`,
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

function historyLine(entry: PersonalHistoryBase): string {
  const detail =
    entry.origin === 'Diagnóstico médico'
      ? [entry.diagnosisDate, entry.diagnosedBy].filter(Boolean).join(' · ')
      : ''
  return summary.history.line(entry.condition, entry.origin.toLowerCase(), detail)
}

export function personalHistorySummary(form: PatientForm): string {
  const mental =
    form.mentalHistory.length === 0
      ? summary.emptySection
      : form.mentalHistory.map(historyLine).join('\n')
  const physical =
    form.physicalHistory.length === 0
      ? summary.emptySection
      : form.physicalHistory
          .map((entry) => {
            const line = historyLine(entry)
            return entry.severe ? `${line} · ${summary.history.severe}` : line
          })
          .join('\n')
  return summary.personalHistory(mental, physical)
}
