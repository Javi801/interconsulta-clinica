export type FormStatus = 'draft' | 'pending' | 'sent' | 'not-sent'

export type SymptomCourse = 'Constante' | 'Episódico' | 'Fluctuante'
export type Adherence = 'Alta' | 'Media' | 'Baja'
export type RiskPresence = 'Presente' | 'Antecedente'
export type RiskLevel = 'Bajo' | 'Moderado' | 'Alto' | 'Inminente'
export type DatePrecision = 'Año' | 'Mes y año' | 'Fecha exacta'
export type FamilyHistoryType = 'Diagnóstico confirmado' | 'Inferido o sospechado'

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
  email: string
  occupations: string[]
  occupationDetail: string
}

export interface MotiveExpectations {
  mainReason: string
  currentConcern: string
  since: string
  expectations: string
  selfHypothesis: string
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
}

export interface Medication {
  name: string
  dose: string
  frequency: string
  time: string
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
  language: string
  mood: string
  thought: string
  judgment: string
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
