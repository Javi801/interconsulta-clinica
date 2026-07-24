export type FormStatus = 'draft' | 'pending' | 'sent' | 'not-sent'

export type SymptomCourse = 'Constante' | 'Episódico' | 'Fluctuante' | 'No sabe'
export type Adherence = 'Alta' | 'Media' | 'Baja'
export type RiskPresence = 'Presente' | 'Antecedente'
export type RiskLevel = 'Bajo' | 'Moderado' | 'Alto' | 'Inminente'
export type ClinicalPriority = 'Alta' | 'Media' | 'Baja'
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
export type MedicationStatus = 'Actual' | 'Pasado'
export type DiagnosisOrigin = 'Diagnóstico médico' | 'Autopercibido' | 'En estudio' | 'No sé'
export type HistorySource = 'mental' | 'physical'
export type FamilyHistoryType =
  | 'Diagnóstico confirmado'
  | 'Referido por la familia'
  | 'Inferido o sospechado'

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

export interface ConditionRef {
  source: HistorySource
  id: number
}

export interface PersonalHistoryBase {
  id: number
  condition: string
  origin: DiagnosisOrigin
  /** 'YYYY-MM'; only meaningful when origin is 'Diagnóstico médico'. */
  diagnosisDate: string
  /** Only meaningful when origin is 'Diagnóstico médico'. */
  diagnosedBy: string
  observation: string
}

export type MentalHistory = PersonalHistoryBase

export interface PhysicalHistory extends PersonalHistoryBase {
  /** Marks the condition as serious, chronic or disabling (SAD PERSONS "Sickness"). */
  severe: boolean
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
  mentalHistory: MentalHistory[]
  physicalHistory: PhysicalHistory[]
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

export interface ClinicalHypothesis {
  hypothesis: string
  priority: ClinicalPriority
  comment: string
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
  hypotheses: ClinicalHypothesis[]
  risks: ClinicalRisk[]
  referralReasons: string[]
  score: number
  threshold: number
  suggestionValid: boolean
  report: ReferralReport
}
