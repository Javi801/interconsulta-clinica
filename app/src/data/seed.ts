import type {
  Adherence,
  ClinicalPriority,
  DatePrecision,
  FamilyHistoryType,
  FormStatus,
  MedicationFrequency,
  Patient,
  PatientForm,
  PsychForm,
  RiskLevel,
  RiskPresence,
  SymptomCourse,
} from '../types'

export const STATUS_LABELS: Record<FormStatus, string> = {
  draft: 'Borrador',
  pending: 'Pendiente',
  sent: 'Enviado',
  'not-sent': 'No enviado',
}

export const STATUS_CLASSES: Record<FormStatus, string> = {
  draft: 'draft',
  pending: 'pending',
  sent: 'sent',
  'not-sent': 'no',
}

export const OCCUPATION_OPTIONS = [
  'Trabaja',
  'Estudia',
  'Dueña/o de casa',
  'Trabaja por turnos',
  'Cuidadora/or',
  'Otro',
]

export const GENDER_OPTIONS = ['Mujer', 'Hombre', 'No binario', 'Otro']

export const COURSE_OPTIONS: SymptomCourse[] = [
  'Constante',
  'Episódico',
  'Fluctuante',
  'No sabe',
]

export const SYMPTOM_OPTIONS = [
  'Estado de ánimo',
  'Ansiedad',
  'Sueño',
  'Energía y activación',
  'Cognición',
  'Conducta e impulsividad',
  'Alimentación',
  'Otros síntomas',
]

export const SUBSTANCE_OPTIONS = [
  'Alcohol',
  'Tabaco',
  'Cannabis',
  'Cocaína',
  'Estimulantes',
  'Benzodiacepinas sin indicación o fuera de la dosis indicada',
  'Opioides',
  'Alucinógenos',
  'Otra sustancia',
]

export const SUBSTANCE_STATUS_OPTIONS = ['Consumo actual', 'Consumo anterior', 'Uso ocasional']

export const ADHERENCE_OPTIONS: Adherence[] = ['Alta', 'Media', 'Baja']

export const MEDICATION_FREQUENCY_OPTIONS: MedicationFrequency[] = [
  'Una vez al día',
  'Dos veces al día',
  'Tres o más veces al día',
  'Cada X horas',
  'Semanal',
  'Días específicos',
  'Según necesidad (SOS)',
  'Otro',
]

export const DATE_PRECISION_OPTIONS: DatePrecision[] = ['Año', 'Mes y año', 'Fecha exacta']

export const FAMILY_CONDITION_OPTIONS = [
  'Depresión',
  'Trastorno bipolar',
  'Esquizofrenia u otros trastornos psicóticos',
  'Trastornos de ansiedad',
  'Suicidio o intentos suicidas',
  'Consumo problemático de sustancias',
  'TDAH',
  'Autismo',
  'Trastornos alimentarios',
  'Enfermedades neurocognitivas',
  'Otro',
]

export const FAMILY_HISTORY_TYPE_OPTIONS: FamilyHistoryType[] = [
  'Diagnóstico confirmado',
  'Referido por la familia',
  'Inferido o sospechado',
  'No sabe',
]

export const LIFE_EVENT_CATEGORY_OPTIONS = [
  'Duelo',
  'Separación',
  'Violencia',
  'Accidente',
  'Enfermedad',
  'Cambio laboral',
  'Cambio de residencia',
  'Migración',
  'Problema familiar',
  'Evento traumático',
  'Otro',
]

export const RISK_PRESENCE_OPTIONS: RiskPresence[] = ['Presente', 'Antecedente']

export const RISK_LEVEL_OPTIONS: RiskLevel[] = ['Bajo', 'Moderado', 'Alto', 'Inminente']

export const HYPOTHESIS_OPTIONS = ['Place holder 1', 'Place holder 2', 'Place holder 3']

export const HYPOTHESIS_PRIORITY_OPTIONS: ClinicalPriority[] = ['Alta', 'Media', 'Baja']

export const REFERRAL_REASON_OPTIONS = [
  'Inicio de esquema farmacológico',
  'Continuidad de esquema farmacológico',
  'Persistencia de síntomas',
  'Deterioro funcional',
]

export const EDIT_PIN = '4827'

export const SEED_PATIENTS: Patient[] = [
  {
    rut: '12.345.678-5',
    name: 'Daniela Pérez Soto',
    patientFormStatus: 'sent',
    psychFormStatus: 'draft',
    updatedAt: '21/07/2026',
  },
  {
    rut: '9.876.543-2',
    name: 'Martín González',
    patientFormStatus: 'not-sent',
    psychFormStatus: 'pending',
    updatedAt: '20/07/2026',
  },
]

export const SEED_PATIENT_FORM: PatientForm = {
  general: {
    rut: '12.345.678-5',
    firstName: 'Daniela',
    lastName: 'Pérez Soto',
    birthDate: '1991-05-18',
    gender: 'Mujer',
    nationality: 'Chilena',
    livesWith: 'Pareja e hija',
    relationshipStatus: 'En pareja',
    phone: '+569 1234 5678',
    email: 'daniela@ejemplo.cl',
    occupations: ['Trabaja'],
    occupationDetail: 'Profesora de educación básica, jornada completa',
  },
  motive: {
    mainReason: 'Ansiedad persistente, dificultades para dormir y problemas de concentración.',
    since: 'Desde aproximadamente marzo de 2025.',
    expectations: 'Entender mejor lo que me ocurre y recuperar mi funcionamiento habitual.',
    psychiatryFears: 'Me preocupa depender de medicamentos.',
    additionalInfo: 'Mi madre tuvo depresión y actualmente estoy pasando por un cambio de jefatura.',
  },
  satisfaction: {
    work: 3,
    family: 7,
    couple: 6,
    selfCare: 4,
    general: 5,
  },
  symptoms: [
    {
      name: 'Ansiedad',
      intensity: 8,
      onset: '2025-03',
      course: 'Constante',
      observation: 'Preocupación excesiva',
    },
    {
      name: 'Sueño',
      intensity: 8,
      onset: '2025-04',
      course: 'Fluctuante',
      observation: 'Dificultad para dormir',
    },
    {
      name: 'Energía y activación',
      intensity: 6,
      onset: '2025-05',
      course: 'Constante',
      observation: 'Fatiga',
    },
  ],
  medications: [
    {
      name: 'Sertralina',
      dose: '50 mg',
      frequency: 'Una vez al día',
      frequencyDetail: '',
      times: ['08:00'],
      prescribedBy: 'Médico general',
      adherence: 'Alta',
    },
  ],
  substances: [
    {
      substance: 'Alcohol',
      status: 'Consumo actual',
      frequency: '2 a 3 veces por semana',
      usualAmount: '2 copas por ocasión',
      onset: '2012-01',
      lastUse: '2026-07-18',
    },
  ],
  familyHistory: [
    {
      condition: 'Depresión',
      relationship: 'Madre',
      type: 'Diagnóstico confirmado',
      observation: 'Tratamiento previo conocido',
    },
  ],
  lifeEvents: [
    {
      category: 'Cambio laboral',
      startPrecision: 'Año',
      startDate: '2025',
      endPrecision: 'Año',
      endDate: '2025',
      description: 'Cambio de jefatura y aumento de carga',
    },
  ],
}

export const SEED_PSYCH_FORM: PsychForm = {
  evaluation: {
    appearance: 'Presentación personal adecuada al contexto.',
    behavior: 'Colaboradora, inquietud motora leve.',
    attitude: 'Cooperadora y dispuesta durante la entrevista.',
    language: 'Fluido, coherente y de volumen conservado.',
    mood: 'Ansioso, con afecto congruente.',
    affect: 'Reactivo, resonancia conservada.',
    thought: 'Curso conservado, preocupación laboral persistente.',
    perception: 'Sin alteraciones sensoperceptivas.',
    orientation: 'Orientada en tiempo, espacio y persona.',
    attention: 'Atención y concentración levemente disminuidas.',
    memory: 'Memoria reciente y remota conservadas.',
    judgment: 'Conservado.',
    insight: 'Buena conciencia de su situación actual.',
    additionalObservations: 'Sin hallazgos clínicos adicionales relevantes.',
  },
  hypotheses: [{ hypothesis: 'Place holder 1', priority: 'Media', comment: '' }],
  risks: [{ id: 1, risk: 'Ideas de muerte', presence: 'Antecedente', level: 'Bajo' }],
  referralReasons: [
    'Inicio de esquema farmacológico',
    'Persistencia de síntomas',
    'Deterioro funcional',
  ],
  score: 18,
  threshold: 12,
  suggestionValid: true,
  report: {
    request: 'Se solicita evaluación psiquiátrica para considerar el inicio de esquema farmacológico.',
    summary: 'Paciente de 35 años, mujer, chilena, profesora de educación básica, vive con su pareja e hija.',
    symptoms: 'Refiere preocupación excesiva de intensidad 8/10, dificultad para dormir 8/10 y fatiga 6/10.',
    medications: 'Sertralina 50 mg una vez al día a las 08:00.',
    previousTreatments: 'Se encuentra actualmente en atención psicológica.',
    background: 'Antecedente familiar de depresión materna y consumo actual de alcohol dos a tres veces por semana.',
  },
}
