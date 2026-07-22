export type FormStatus = 'draft' | 'pending' | 'sent' | 'not-sent'

export type SymptomCourse = 'Constante' | 'Episódico' | 'Fluctuante' | 'No sabe'
export type Adherence = 'Alta' | 'Media' | 'Baja'
export type RiskPresence = 'Presente' | 'Antecedente'
export type RiskLevel = 'Bajo' | 'Moderado' | 'Alto' | 'Inminente'
export type DatePrecision = 'Año' | 'Mes y año' | 'Fecha exacta'
export type MedicationFrequency =
  | 'Una vez al día'
  | 'Dos veces al día'
  | 'Tres o más veces al día'
  | 'Cada X horas'
  | 'Semanal'
  | 'Días específicos'
  | 'Según necesidad (SOS)'
  | 'Otro'
export type FamilyHistoryType =
  | 'Diagnóstico confirmado'
  | 'Referido por la familia'
  | 'Inferido o sospechado'
  | 'No sabe'

export interface Patient {
  rut: string
  name: string
  patientFormStatus: FormStatus
  psychFormStatus: FormStatus
  updatedAt: string
}

export interface GeneralData {
  rut: string
  firstName: string
  lastName: string
  birthDate: string
  gender: string
  nationality: string
  livesWith: string
  relationshipStatus: string
  phone: string
  email: string
  occupations: string[]
  occupationDetail: string
}

export interface MotiveExpectations {
  mainReason: string
  since: string
  expectations: string
  psychiatryFears: string
  additionalInfo: string
}

export interface SatisfactionScores {
  work: number
  family: number
  couple: number
  selfCare: number
  general: number
}

export interface Symptom {
  name: string
  intensity: number
  onset: string
  course: SymptomCourse
  observation: string
}

export interface Medication {
  name: string
  dose: string
  frequency: MedicationFrequency
  /** Free-text description, only used when frequency is 'Otro'. */
  frequencyDetail: string
  times: string[]
  prescribedBy: string
  adherence: Adherence
}

export interface SubstanceUse {
  substance: string
  status: string
  frequency: string
  usualAmount: string
  onset: string
  lastUse: string
}

export interface FamilyHistory {
  condition: string
  relationship: string
  type: FamilyHistoryType
  observation: string
}

export interface LifeEvent {
  category: string
  startPrecision: DatePrecision
  startDate: string
  endPrecision: DatePrecision
  endDate: string
  description: string
}

export interface PatientForm {
  general: GeneralData
  motive: MotiveExpectations
  satisfaction: SatisfactionScores
  symptoms: Symptom[]
  medications: Medication[]
  substances: SubstanceUse[]
  familyHistory: FamilyHistory[]
  lifeEvents: LifeEvent[]
}

export interface ClinicalEvaluation {
  appearance: string
  behavior: string
  attitude: string
  language: string
  mood: string
  affect: string
  thought: string
  perception: string
  orientation: string
  attention: string
  memory: string
  judgment: string
  insight: string
  additionalObservations: string
}

export interface ClinicalRisk {
  id: number
  risk: string
  presence: RiskPresence
  level: RiskLevel
}

export interface ReferralReport {
  request: string
  summary: string
  symptoms: string
  medications: string
  previousTreatments: string
  background: string
}

export interface PsychForm {
  evaluation: ClinicalEvaluation
  hypotheses: string[]
  risks: ClinicalRisk[]
  referralReasons: string[]
  score: number
  threshold: number
  suggestionValid: boolean
  report: ReferralReport
}
