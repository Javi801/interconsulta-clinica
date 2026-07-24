import type {
  FamilyHistory,
  GeneralData,
  LifeEvent,
  Medication,
  MotiveExpectations,
  PersonalHistoryBase,
  SubstanceUse,
  Symptom,
} from '../types'

/** Required free-text fields need at least 5 characters. */
export const isValidText = (value: string): boolean => value.trim().length >= 5

export const isFilled = (value: string): boolean => value.trim() !== ''

/** Class for fields highlighted as invalid only after a submit attempt. */
export const invalidClass = (showErrors: boolean, valid: boolean): string | undefined =>
  showErrors && !valid ? 'invalid' : undefined

export const isGeneralValid = (general: GeneralData): boolean =>
  [
    general.firstName,
    general.lastName,
    general.nationality,
    general.livesWith,
    general.relationshipStatus,
    general.occupationDetail,
  ].every(isValidText) &&
  isFilled(general.birthDate) &&
  general.occupations.length > 0

export const isMotiveValid = (motive: MotiveExpectations): boolean =>
  [
    motive.mainReason,
    motive.since,
    motive.expectations,
    motive.psychiatryFears,
    motive.additionalInfo,
  ].every(isValidText)

export const isSymptomValid = (symptom: Symptom): boolean => isFilled(symptom.onset)

export const isMedicationValid = (medication: Medication): boolean => {
  if (!isFilled(medication.name)) return false
  if (
    medication.status === 'Actual' &&
    medication.frequency === 'Otro' &&
    !isValidText(medication.frequencyDetail)
  )
    return false
  return medication.times.every(isFilled)
}

export const isSubstanceValid = (substance: SubstanceUse): boolean =>
  [substance.frequency, substance.usualAmount].every(isValidText) &&
  [substance.onset, substance.lastUse].every(isFilled)

export const isFamilyHistoryValid = (entry: FamilyHistory): boolean =>
  isValidText(entry.relationship)

export const isPersonalHistoryValid = (entry: PersonalHistoryBase): boolean =>
  isFilled(entry.condition)

export const isLifeEventValid = (event: LifeEvent): boolean =>
  [event.startDate, event.endDate].every(isFilled)
