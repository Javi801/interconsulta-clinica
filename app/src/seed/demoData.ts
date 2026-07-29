import database from './database.json'
import type {
  ClinicalEvaluation,
  ClinicalHypothesis,
  ClinicalRisk,
  Coordinator,
  DiagnosisOrigin,
  FamilyHistory,
  FormStatus,
  Medication,
  Patient,
  PatientForm,
  PhysicalHistory,
  PsychForm,
  Psychologist,
  RiskLevel,
  RiskPresence,
  SubstanceUse,
  Symptom,
  SymptomCourse,
} from '../types'

type SatisfactionTuple = [number, number, number, number]
type SymptomSeed = [string, number, string, SymptomCourse, string]
type FamilySeed = [string, string]
type SubstanceSeed = [string, string, string, string]
type HypothesisSeed = [string, 'Alta' | 'Media' | 'Baja', string]
type RiskSeed = [string, RiskPresence, RiskLevel]

interface SeedCase {
  rut: string
  name: string
  assignedPsychologistId: string
  patientFormStatus: FormStatus
  psychFormStatus: FormStatus
  updatedAt: string
  general: Omit<PatientForm['general'], 'rut'>
  selfReport: PatientForm['motive'] & { satisfaction: SatisfactionTuple }
  symptoms: SymptomSeed[]
  history: {
    mental: string[]
    physical: string[]
    family: FamilySeed[]
    substances: SubstanceSeed[]
  }
  clinical: {
    presentation: string
    mood: string
    thought: string
    hypotheses: HypothesisSeed[]
    risks: RiskSeed[]
    referralReasons: string[]
  }
}

interface SeedDatabase {
  settings: {
    accessCode: string
    editPin: string
    importedRut: string
    demoPsychologistId: string
    demoCoordinatorId: string
  }
  coordinators: Coordinator[]
  psychologists: Psychologist[]
  cases: SeedCase[]
}

const db = database as SeedDatabase

export const EDIT_PIN = db.settings.editPin
export const ACCESS_CODE = db.settings.accessCode
export const IMPORTED_RUT = db.settings.importedRut

export const SEED_PSYCHOLOGISTS: Psychologist[] = db.psychologists
export const DEMO_PSYCHOLOGIST_ID = db.settings.demoPsychologistId

export const SEED_COORDINATORS: Coordinator[] = db.coordinators
export const DEMO_COORDINATOR_ID = db.settings.demoCoordinatorId

export const SEED_PATIENTS: Patient[] = db.cases.map(
  ({ rut, name, assignedPsychologistId, patientFormStatus, psychFormStatus, updatedAt }) => ({
    rut,
    name,
    assignedPsychologistId,
    patientFormStatus,
    psychFormStatus,
    updatedAt,
  }),
)

export const DEFAULT_PATIENT_FORM: PatientForm = {
  general: {
    rut: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    nationality: 'Chilena',
    livesWith: '',
    relationshipStatus: '',
    occupations: [],
    occupationDetail: '',
  },
  motive: {
    mainReason: '',
    since: '',
    expectations: '',
    psychiatryFears: '',
    additionalInfo: '',
  },
  satisfaction: { work: 5, family: 5, couple: 5, selfCare: 5 },
  symptoms: [],
  medications: [],
  substances: [],
  familyHistory: [],
  mentalHistory: [],
  physicalHistory: [],
  lifeEvents: [],
}

export const DEFAULT_PSYCH_FORM: PsychForm = {
  evaluation: {
    appearance: '',
    behavior: '',
    attitude: '',
    language: '',
    mood: '',
    affect: '',
    thought: '',
    perception: '',
    orientation: '',
    attention: '',
    memory: '',
    judgment: '',
    insight: '',
    additionalObservations: '',
  },
  hypotheses: [],
  risks: [],
  referralReasons: [],
  report: {
    request: '',
    summary: '',
    symptoms: '',
    medications: '',
    previousTreatments: '',
    background: '',
  },
}

const medicationFor = (condition: string, source: 'mental' | 'physical', id: number): Medication => ({
  id,
  name: source === 'physical' ? 'Tratamiento habitual' : 'Tratamiento indicado',
  status: 'Actual',
  linkedCondition: { source, id },
  dose: '',
  frequency: 'Una vez al día',
  frequencyDetail: '',
  times: [],
  period: '',
  prescribedBy: source === 'physical' ? 'Otro especialista' : 'Médico general o de familia',
  adherence: condition === 'Consumo problemático de alcohol o drogas' ? 'Baja' : 'Media',
})

function patientFormFromSeed(seedCase: SeedCase): PatientForm {
  const mentalHistory = seedCase.history.mental.map((condition, index) => ({
    id: index + 1,
    condition,
    origin: (index === 0 ? 'En estudio' : 'Autopercibido') as DiagnosisOrigin,
    diagnosisDate: '',
    diagnosedBy: '',
    observation: '',
  }))
  const physicalHistory: PhysicalHistory[] = seedCase.history.physical.map((condition, index) => ({
    id: index + 1,
    condition,
    origin: 'Diagnóstico médico',
    diagnosisDate: '',
    diagnosedBy: 'Otro especialista',
    severe: /cáncer|dolor crónico|diabetes|hipertensión|tiroidea|bajo peso|desnutrición/i.test(
      condition,
    ),
    observation: '',
  }))

  const medications = [
    ...mentalHistory.slice(0, 1).map((entry) => medicationFor(entry.condition, 'mental', entry.id)),
    ...physicalHistory.slice(0, 1).map((entry) => medicationFor(entry.condition, 'physical', entry.id)),
  ]

  return {
    general: { ...seedCase.general, rut: seedCase.rut },
    motive: {
      mainReason: seedCase.selfReport.mainReason,
      since: seedCase.selfReport.since,
      expectations: seedCase.selfReport.expectations,
      psychiatryFears: seedCase.selfReport.psychiatryFears,
      additionalInfo: seedCase.selfReport.additionalInfo,
    },
    satisfaction: {
      work: seedCase.selfReport.satisfaction[0],
      family: seedCase.selfReport.satisfaction[1],
      couple: seedCase.selfReport.satisfaction[2],
      selfCare: seedCase.selfReport.satisfaction[3],
    },
    symptoms: seedCase.symptoms.map<Symptom>(([name, intensity, onset, course, observation]) => ({
      name,
      intensity,
      onset,
      course,
      observation,
    })),
    medications,
    substances: seedCase.history.substances.map<SubstanceUse>(
      ([substance, status, frequency, usualAmount]) => ({
        substance,
        status,
        frequency,
        usualAmount,
        onset: '',
        lastUse: seedCase.updatedAt.split('/').reverse().join('-'),
      }),
    ),
    familyHistory: seedCase.history.family.map<FamilyHistory>(([condition, relationship]) => ({
      condition,
      relationship,
      type: 'Referido por la familia',
      observation: '',
    })),
    mentalHistory,
    physicalHistory,
    lifeEvents: [],
  }
}

const emptyEvaluation = DEFAULT_PSYCH_FORM.evaluation

function buildEvaluation(seedCase: SeedCase): ClinicalEvaluation {
  return {
    appearance: seedCase.clinical.presentation,
    behavior: 'Colabora durante la entrevista, sin alteraciones conductuales mayores.',
    attitude: 'Actitud cooperadora.',
    language: 'Lenguaje claro y organizado.',
    mood: seedCase.clinical.mood,
    affect: 'Afecto congruente con el contenido relatado.',
    thought: seedCase.clinical.thought,
    perception: 'Sin alteraciones sensoperceptivas pesquisadas.',
    orientation: 'Orientación conservada.',
    attention: 'Atención suficiente para entrevista clínica.',
    memory: 'Memoria globalmente conservada.',
    judgment: 'Juicio conservado salvo áreas descritas en riesgo.',
    insight: 'Insight parcial a adecuado.',
    additionalObservations:
      seedCase.psychFormStatus === 'pending'
        ? 'Evaluación clínica pendiente de cierre.'
        : 'Se integra información del autorreporte y entrevista psicológica.',
  }
}

function psychFormFromSeed(seedCase: SeedCase): PsychForm {
  if (seedCase.clinical.hypotheses.length === 0 && seedCase.clinical.risks.length === 0) {
    return DEFAULT_PSYCH_FORM
  }

  const patientForm = patientFormFromSeed(seedCase)
  const hypotheses = seedCase.clinical.hypotheses.map<ClinicalHypothesis>(
    ([hypothesis, priority, comment]) => ({ hypothesis, priority, comment }),
  )
  const risks = seedCase.clinical.risks.map<ClinicalRisk>(([risk, presence, level], index) => ({
    id: index + 1,
    risk,
    presence,
    level,
  }))
  const symptomSummary = patientForm.symptoms
    .map((symptom) => `${symptom.name} ${symptom.intensity}/10`)
    .join(', ')

  return {
    evaluation: seedCase.psychFormStatus === 'pending' ? { ...emptyEvaluation } : buildEvaluation(seedCase),
    hypotheses,
    risks,
    referralReasons: seedCase.clinical.referralReasons,
    report: {
      request: seedCase.clinical.referralReasons.length
        ? `Se solicita evaluación psiquiátrica por ${seedCase.clinical.referralReasons[0].toLowerCase()}.`
        : '',
      summary: `${seedCase.name}, ${patientForm.general.occupationDetail.toLowerCase()}, consulta por ${patientForm.motive.mainReason.toLowerCase()}`,
      symptoms: symptomSummary,
      medications: patientForm.medications.length
        ? patientForm.medications.map((medication) => medication.name).join(', ')
        : 'Sin medicamentos actuales declarados.',
      previousTreatments: patientForm.mentalHistory.length
        ? patientForm.mentalHistory.map((entry) => entry.condition).join(', ')
        : 'Sin antecedentes de salud mental declarados.',
      background: [
        patientForm.familyHistory.length ? 'Antecedentes familiares presentes' : '',
        patientForm.physicalHistory.length ? 'Antecedentes físicos relevantes' : '',
        patientForm.substances.length ? 'Consumo de sustancias declarado' : '',
      ]
        .filter(Boolean)
        .join('. '),
    },
  }
}

export const SEED_PATIENT_FORMS: Record<string, PatientForm> = Object.fromEntries(
  db.cases.map((seedCase) => [seedCase.rut, patientFormFromSeed(seedCase)]),
)

export const SEED_PSYCH_FORMS: Record<string, PsychForm> = Object.fromEntries(
  db.cases.map((seedCase) => [seedCase.rut, psychFormFromSeed(seedCase)]),
)

export function getSeedPatientForm(rut: string): PatientForm {
  const form = SEED_PATIENT_FORMS[rut] ?? {
    ...DEFAULT_PATIENT_FORM,
    general: { ...DEFAULT_PATIENT_FORM.general, rut },
  }
  return {
    ...form,
    general: { ...form.general, rut },
    satisfaction: { ...form.satisfaction },
    symptoms: form.symptoms.map((item) => ({ ...item })),
    medications: form.medications.map((item) => ({
      ...item,
      linkedCondition: item.linkedCondition ? { ...item.linkedCondition } : null,
      times: [...item.times],
    })),
    substances: form.substances.map((item) => ({ ...item })),
    familyHistory: form.familyHistory.map((item) => ({ ...item })),
    mentalHistory: form.mentalHistory.map((item) => ({ ...item })),
    physicalHistory: form.physicalHistory.map((item) => ({ ...item })),
    lifeEvents: form.lifeEvents.map((item) => ({ ...item })),
  }
}

export function getSeedPsychForm(rut: string): PsychForm {
  const form = SEED_PSYCH_FORMS[rut] ?? DEFAULT_PSYCH_FORM
  return {
    ...form,
    evaluation: { ...form.evaluation },
    hypotheses: form.hypotheses.map((item) => ({ ...item })),
    risks: form.risks.map((item) => ({ ...item })),
    referralReasons: [...form.referralReasons],
    report: { ...form.report },
  }
}
