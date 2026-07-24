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
} from './types'

// ============================================================================
// FIELD LIMITS
// Max character length per field group. Single source of truth shared by the
// input constraint and the copy that announces it.
// ============================================================================

export const FIELD_MAX_LENGTH = {
  motive: 200,
  evaluation: 100,
  lifeEventDescription: 50,
} as const

// ============================================================================
// UI COPY
// All user-facing strings, grouped by view and section.
// ============================================================================

export const TEXT = {
  common: {
    add: 'Agregar',
    cancel: 'Cancelar',
    remove: 'Eliminar',
    specify: 'Especificar',
    back: '← Volver',
  },

  nav: {
    brand: 'Derivación Clínica',
    brandSubtitle: 'Mockup de demostración',
    items: {
      patient: 'Vista paciente',
      psych: 'Vista psicólogo',
    },
  },

  patient: {
    access: {
      title: 'Acceso al formulario',
      subtitle: 'Ingresa con el código que te entregó tu psicólogo y tu RUT.',
      fields: {
        code: 'Código de acceso',
        rut: 'RUT',
      },
      codePlaceholder: (code: string) => `Ej: ${code}`,
      enter: 'Ingresar',
      or: 'o',
      useLink: 'Ingresar con enlace de invitación',
      linkHelp:
        'Si recibiste un enlace, el código se completa automáticamente y solo debes ingresar tu RUT.',
      demoNote: (code: string) =>
        `Demo: usa el código ${code} y cualquier RUT válido para continuar.`,
      errors: {
        code: 'El código de acceso no es válido.',
        rut: 'El RUT ingresado no es válido.',
      },
    },
    view: {
      title: 'Formulario del paciente',
      subtitle: 'Completa tus antecedentes y síntomas actuales.',
      save: 'Guardar',
      submit: 'Enviar formulario',
      notice: 'Demo: los datos ingresados no se envían ni almacenan.',
      footerNote:
        'El mockup muestra solo una parte de los campos definidos para mantener la demo legible.',
      savedAlert: 'Datos guardados en esta demostración.',
      confirmModal: {
        title: 'Enviar formulario',
        subtitle: 'Verifica que está correcto.',
        confirm: 'Enviar',
      },
    },
    generalData: {
      title: 'Datos generales',
      subtitle: 'Información básica de identificación y contexto.',
      ageCounter: (age: number) => `Edad calculada: ${age} años`,
      occupationsLabel: 'Ocupaciones o actividades',
      occupationDetailLabel: 'Detalle de ocupación o situación laboral',
      fields: {
        rut: 'RUT',
        firstName: 'Nombres',
        lastName: 'Apellidos',
        birthDate: 'Fecha de nacimiento',
        gender: 'Género',
        nationality: 'Nacionalidad',
        livesWith: 'Con quién vive',
        relationshipStatus: 'Situación de pareja',
        phone: 'Teléfono',
        email: 'Correo',
      },
    },
    motive: {
      title: 'Motivo y expectativas',
      subtitle: `Máximo ${FIELD_MAX_LENGTH.motive} caracteres por campo.`,
      fields: {
        mainReason: 'Motivo principal de consulta',
        since: 'Desde cuándo ocurre',
        expectations: 'Qué espera obtener de la atención psiquiátrica',
        psychiatryFears: 'Temores o dudas sobre atención psiquiátrica',
        additionalInfo: 'Información adicional importante',
      },
    },
    satisfaction: {
      title: 'Funcionamiento y satisfacción',
      subtitle: '1 = muy baja satisfacción; 10 = muy alta.',
      fields: {
        work: 'Individualmente (bienestar personal)',
        family: 'Interpersonalmente (familia o relaciones cercanas)',
        couple: 'Socialmente (trabajo, colegio, amistades)',
        selfCare: 'Globalmente (sensación de bienestar general)',
      },
    },
    symptoms: {
      title: 'Síntomas actuales',
      subtitle: 'Todos los campos son obligatorios.',
      addLabel: 'Agregar síntoma',
      pickLabel: 'Síntoma',
      otherOption: 'Otros síntomas',
      itemLabel: 'Síntoma',
      fields: {
        intensity: 'Intensidad',
        onset: 'Inicio',
        course: 'Curso',
        observation: 'Observación (opcional)',
      },
    },
    medications: {
      title: 'Medicamentos actuales',
      subtitle: 'Todos los campos son obligatorios.',
      addLabel: 'Agregar medicamento',
      itemLabel: 'Medicamento',
      addTime: 'Agregar horario',
      fields: {
        name: 'Nombre',
        dose: 'Dosis',
        frequency: 'Frecuencia',
        frequencyDetail: 'Especificar frecuencia',
        prescribedBy: 'Profesional que indicó',
        adherence: 'Adherencia percibida',
        times: 'Horarios (opcional según frecuencia)',
      },
    },
    substances: {
      title: 'Consumo de sustancias',
      subtitle: 'Todos los campos son obligatorios.',
      addLabel: 'Agregar sustancia',
      pickLabel: 'Sustancia',
      otherOption: 'Otra sustancia',
      itemLabel: 'Sustancia',
      fields: {
        status: 'Estado',
        frequency: 'Frecuencia',
        usualAmount: 'Cantidad habitual',
        onset: 'Inicio aproximado',
        lastUse: 'Último consumo',
      },
    },
    familyHistory: {
      title: 'Antecedentes familiares',
      subtitle: 'Todos los campos son obligatorios.',
      addLabel: 'Agregar antecedente',
      pickLabel: 'Condición',
      otherOption: 'Otro',
      itemLabel: 'Condición',
      fields: {
        relationship: 'Parentesco',
        type: 'Tipo',
        observation: 'Observación (opcional)',
      },
    },
    lifeEvents: {
      title: 'Eventos importantes',
      subtitle: 'Todos los campos son obligatorios.',
      addLabel: 'Agregar evento',
      pickLabel: 'Categoría',
      otherOption: 'Otro',
      itemLabel: 'Evento',
      fields: {
        startPrecision: 'Precisión inicio',
        startDate: 'Fecha inicial',
        endPrecision: 'Precisión término',
        endDate: 'Fecha final',
        description: 'Descripción breve (opcional)',
      },
    },
  },

  validation: {
    general: 'Completa todos los campos de Datos generales.',
    rut: 'El RUT ingresado no es válido.',
    email: 'El correo ingresado no es válido.',
    motive: 'Completa todos los campos de Motivo y expectativas.',
    symptomsRequired: 'Debes registrar al menos un síntoma.',
    symptoms: 'Completa los campos obligatorios de Síntomas actuales.',
    medications: 'Completa los campos obligatorios de Medicamentos actuales.',
    substances: 'Completa los campos obligatorios de Consumo de sustancias.',
    familyHistory: 'Completa los campos obligatorios de Antecedentes familiares.',
    lifeEvents: 'Completa los campos obligatorios de Eventos importantes.',
  },

  psych: {
    view: {
      title: 'Panel del psicólogo',
      subtitle: 'Accede a cada formulario directamente desde su estado.',
      exportExcel: 'Exportar Excel',
      notSentAlert: 'El formulario del paciente aún no ha sido enviado.',
      importedPatient: 'Paciente importado',
      today: 'Hoy',
      excelReplacedAlert:
        'Excel cargado: el formulario del paciente existente fue reemplazado y quedó como enviado.',
      excelCreatedAlert:
        'Excel cargado: se creó un nuevo paciente y su formulario quedó como enviado.',
    },
    dashboard: {
      title: 'Pacientes',
      subtitle: 'Haz clic sobre el estado del formulario que quieras revisar.',
      newPatient: 'Nuevo paciente',
      loadExcel: 'Cargar Excel',
      rutRequiredAlert: 'Debes ingresar el RUT.',
      nameRequiredAlert: 'Debes ingresar nombres y apellidos.',
      columns: {
        rut: 'RUT',
        patient: 'Paciente',
        patientForm: 'Form. paciente',
        psychForm: 'Form. psicólogo',
        updatedAt: 'Actualización',
      },
      createModal: {
        title: 'Nueva instancia de paciente',
        subtitle:
          'Ingresa el RUT, nombres y apellidos para crear el registro y habilitar el formulario del paciente.',
        rutLabel: 'RUT',
        rutPlaceholder: '12.345.678-9',
        firstNameLabel: 'Nombres',
        firstNamePlaceholder: 'Nombres del paciente',
        lastNameLabel: 'Apellidos',
        lastNamePlaceholder: 'Apellidos del paciente',
        create: 'Crear paciente',
      },
    },
    record: {
      title: 'Respuestas del paciente',
      generatePin: 'Generar PIN',
      downloadResults: 'Descargar resultados',
      downloadAlert: 'Demo: descarga de resultados del formulario del paciente.',
      cards: {
        generalData: 'Datos generales',
        motive: 'Motivo y expectativas',
        symptoms: 'Síntomas actuales',
        medications: 'Medicamentos actuales',
        familyAndSubstances: 'Antecedentes familiares y consumo',
      },
      pinModal: {
        title: 'PIN de edición',
        subtitle:
          'Este PIN debe ser entregado por un psicólogo para habilitar cambios en el formulario del paciente.',
        close: 'Cerrar',
        copy: 'Copiar PIN',
      },
    },
    formView: {
      title: 'Formulario del psicólogo',
      subtitle: (patientName: string) => `${patientName} · evaluación clínica`,
      edit: 'Editar',
      exportResults: 'Exportar resultados',
      exportAlert: 'Demo: exportación de resultados.',
      generateResults: 'Generar resultados',
      submit: 'Enviar formulario',
      sentAlert: 'Formulario del psicólogo marcado como enviado.',
    },
    results: {
      simple: {
        title: 'Resumen simple',
        subtitle: 'Información vigente.',
        copy: 'Copiar',
        copyAlert: 'Demo: resumen copiado.',
      },
      report: {
        title: 'Informe para psiquiatría',
        subtitle: 'Texto editable.',
        export: 'Exportar',
        exportAlert: 'Demo: exportación de informe.',
        fields: {
          request: '1. Solicitud de consultoría',
          summary: '2. Breve resumen',
          symptoms: '3. Síntomas actuales',
          medications: '4. Medicamentos actuales',
          previousTreatments: '5. Tratamientos de salud mental anteriores',
          background: '6. Antecedentes relevantes',
        },
      },
    },
    evaluation: {
      title: 'Evaluación clínica',
      subtitle: `Máximo ${FIELD_MAX_LENGTH.evaluation} caracteres por campo.`,
      fields: {
        appearance: 'Apariencia y presentación',
        behavior: 'Conducta observada',
        attitude: 'Actitud durante la entrevista',
        language: 'Lenguaje',
        mood: 'Estado de ánimo observado',
        affect: 'Afecto',
        thought: 'Curso y contenido del pensamiento',
        perception: 'Percepción',
        orientation: 'Orientación',
        attention: 'Atención y concentración',
        memory: 'Memoria',
        judgment: 'Juicio',
        insight: 'Conciencia de situación o insight',
        additionalObservations: 'Observaciones clínicas adicionales',
      },
    },
    hypotheses: {
      title: 'Hipótesis clínicas',
      addLabel: 'Agregar hipótesis',
      pickLabel: 'Hipótesis',
      otherOption: 'Otro',
      itemLabel: 'Hipótesis',
      fields: {
        priority: 'Prioridad clínica',
        comment: 'Comentario (opcional)',
      },
    },
    risks: {
      title: 'Riesgos clínicos',
      addLabel: 'Añadir riesgo clínico',
      pickLabel: 'Riesgo',
      otherOption: 'Otro',
      itemLabel: 'Riesgo',
      fields: {
        presence: 'Presente o antecedente',
        level: 'Nivel',
      },
    },
    referralReasons: {
      title: 'Motivos de derivación',
    },
    suggestion: {
      title: 'Sugerencia de derivación',
      subtitle: 'Resultado temporal basado en puntaje configurable.',
      suggestionLabel: (suggestion: string) => `Sugerencia: ${suggestion}`,
      thresholdLabel: (threshold: number) => `Umbral de demostración: ${threshold} puntos.`,
      valid: 'La sugerencia está correcta',
      invalid: 'La sugerencia no está correcta',
    },
  },

  summary: {
    emptySection: 'Sin registros.',
    general: {
      age: (age: number) => `Edad: ${age} años`,
      gender: (value: string) => `Género: ${value}`,
      nationality: (value: string) => `Nacionalidad: ${value}`,
      occupation: (value: string) => `Ocupación: ${value}`,
      detail: (value: string) => `Detalle: ${value}`,
      livesWith: (value: string) => `Vive con: ${value}`,
    },
    motive: {
      mainReason: (value: string) => `Motivo principal: ${value}`,
      since: (value: string) => `Desde cuándo ocurre: ${value}`,
      expectations: (value: string) => `Qué espera obtener: ${value}`,
    },
    symptom: {
      line: (name: string, intensity: number, onset: string, course: string, observation: string) => {
        const detail = observation ? ` (${observation})` : ''
        const onsetPart = onset ? ` · inicio ${onset}` : ''
        return `- ${name}${detail}: ${intensity}/10${onsetPart} · ${course}`
      },
      simpleLine: (name: string, intensity: number) => `- ${name}: ${intensity}/10`,
    },
    medication: {
      prescribedBy: (value: string) => `Indicado por ${value}`,
      adherence: (value: string) => `Adherencia percibida: ${value}`,
    },
    family: {
      line: (relationship: string, condition: string, type: string) =>
        `- ${relationship}: ${condition}, ${type}`,
    },
    substance: {
      line: (substance: string, frequency: string, usualAmount: string) =>
        `- ${substance}: ${frequency} · ${usualAmount}`,
    },
    familyAndSubstances: (family: string, substances: string) =>
      `Antecedente familiar:\n${family}\n\nConsumo:\n${substances}`,
    suggestion: {
      derive: 'Derivar',
      notDerive: 'No derivar',
    },
    simple: {
      generalHeading: 'DATOS GENERALES',
      symptomsHeading: 'SÍNTOMAS ACTUALES',
      suggestionHeading: 'SUGERENCIA',
      score: (score: number) => `Puntaje: ${score}`,
    },
  },
} as const

// ============================================================================
// STATUS LABELS
// ============================================================================

export const STATUS_LABELS: Record<FormStatus, string> = {
  draft: 'Borrador',
  pending: 'Pendiente',
  sent: 'Enviado',
  'not-sent': 'No enviado',
}

// ============================================================================
// CATALOGS
// Option lists selectable in the UI.
// ============================================================================

export const OCCUPATION_OPTIONS = [
  'Trabaja',
  'Estudia',
  'Dueña/o de casa',
  'Trabaja por turnos',
  'Cuidadora/or',
  'Otro',
]

export const GENDER_OPTIONS = ['Mujer', 'Hombre', 'No binario', 'Otro']

export const COURSE_OPTIONS: SymptomCourse[] = ['Constante', 'Episódico', 'Fluctuante', 'No sabe']

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

export const RISK_OPTIONS = [
  'Ideas de muerte',
  'Ideación suicida',
  'Plan suicida',
  'Intención suicida',
  'Intentos suicidas previos',
  'Autolesiones',
  'Riesgo de violencia hacia otras personas',
  'Impulsividad de alto riesgo',
  'Síntomas psicóticos con riesgo',
  'Agitación o desorganización',
  'Consumo de sustancias con riesgo',
  'Abandono del autocuidado',
  'Vulnerabilidad social',
  'Acceso a medios potencialmente letales',
  'Otro',
]

export const RISK_PRESENCE_OPTIONS: RiskPresence[] = ['Presente', 'Antecedente']

export const RISK_LEVEL_OPTIONS: RiskLevel[] = ['Bajo', 'Moderado', 'Alto', 'Inminente']

export const HYPOTHESIS_OPTIONS = [
  'Trastorno Adaptativo',
  'Trastorno Adaptativo mixto',
  'Trastorno Adaptativo mixto puerperal',
  'Trastorno Adaptativo con síntomas depresivos',
  'Trastorno Adaptativo con síntomas depresivos puerperal',
  'Trastorno Adaptativo con síntomas ansiosos',
  'Trastorno Adaptativo con síntomas ansiosos puerperal',
  'Trastorno Depresivo único leve',
  'Trastorno Depresivo único moderado',
  'Trastorno Depresivo único grave',
  'Trastorno Depresivo único con síntomas psicóticos',
  'Trastorno Depresivo recurrente leve',
  'Trastorno Depresivo recurrente moderado',
  'Trastorno Depresivo recurrente grave',
  'Trastorno Depresivo recurrente con síntomas psicóticos',
  'Trastorno Depresivo post parto leve',
  'Trastorno Depresivo post parto moderado',
  'Trastorno Depresivo post parto grave',
  'Trastorno Depresivo post parto con síntomas psicóticos',
  'Distimia',
  'Trastorno Bipolar Tipo I',
  'Trastorno Bipolar Tipo II',
  'Trastorno Bipolar Tipo III',
  'Trastorno Bipolar Ciclotimia',
  'Consumo problemático de sustancias',
  'Trastorno mixto con predominio ansioso',
  'Trastorno mixto con predominio anímico',
  'Trastorno de estrés agudo (TEA)',
  'Trastorno de estrés postraumático (TEPT)',
  'Trastorno de pánico',
  'Trastorno de pánico con agorafobia',
  'Agorafobia',
  'Agorafobia con crisis de pánico',
  'Trastorno Obsesivo Compulsivo',
  'Fobia social',
  'Fobia especifica',
  'Trastorno de ansiedad generalizada (TAG)',
  'Trastorno psicótico breve',
  'Trastorno psicótico esquizofreniforme',
  'Trastorno psicótico esquizofrenia',
  'Trastorno Explosivo Intermitente',
  'Otro',
]

export const HYPOTHESIS_PRIORITY_OPTIONS: ClinicalPriority[] = ['Alta', 'Media', 'Baja']

export const REFERRAL_REASON_OPTIONS = [
  'Inicio de esquema farmacológico',
  'Continuidad de esquema farmacológico',
  'Evaluación diagnóstica',
  'Diagnóstico diferencial',
  'Evaluación de respuesta a medicamentos',
  'Evaluación de efectos adversos',
  'Ajuste o revisión de tratamiento',
  'Persistencia de síntomas',
  'Agravamiento de síntomas',
  'Deterioro funcional',
  'Evaluación de riesgo',
  'Sospecha de bipolaridad',
  'Sospecha de psicosis',
  'Dificultades relacionadas con consumo',
  'Alteraciones graves del sueño',
  'Otra',
]

// ============================================================================
// DEMO DATA
// Seed content used to populate the mockup.
// ============================================================================

export const EDIT_PIN = '4827'

export const ACCESS_CODE = '738 512'

export const IMPORTED_RUT = '15.222.333-4'

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
  hypotheses: [
    { hypothesis: 'Trastorno de ansiedad generalizada (TAG)', priority: 'Media', comment: '' },
  ],
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
