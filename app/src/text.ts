import type {
  Adherence,
  ClinicalPriority,
  DatePrecision,
  DiagnosisOrigin,
  FamilyHistoryType,
  FormStatus,
  MedicationFrequency,
  MedicationStatus,
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
      coordinator: 'Coordinador',
    },
    session: {
      open: 'Iniciar sesión',
      close: 'Cerrar sesión',
    },
  },

  coordinator: {
    view: {
      title: 'Panel del coordinador',
      subtitle: 'Supervisión de todos los pacientes en modo solo lectura.',
    },
    dashboard: {
      title: 'Todos los pacientes',
      subtitle: 'Revisa cualquier ficha y reasigna pacientes entre psicólogos.',
      columns: {
        assignedPsych: 'Psicólogo asignado',
        actions: 'Acciones',
      },
      reassign: 'Reasignar',
    },
    reassignModal: {
      title: 'Reasignar paciente',
      subtitle:
        'El psicólogo elegido hereda la ficha completa. El anterior pierde el acceso de inmediato.',
      currentLabel: 'Psicólogo actual',
      newLabel: 'Nuevo psicólogo',
      confirm: 'Reasignar',
    },
  },

  auth: {
    login: {
      emailLabel: 'Correo',
      emailPlaceholder: 'nombre@ejemplo.cl',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: '••••••••',
      enter: 'Ingresar',
      demoNote: 'Demo: cualquier correo y contraseña inician la sesión.',
    },
    psych: {
      title: 'Acceso psicólogo',
      subtitle: 'Ingresa con tus credenciales para ver tus pacientes asignados.',
    },
    coordinator: {
      title: 'Acceso coordinador',
      subtitle: 'Ingresa con tus credenciales para supervisar todos los pacientes.',
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
        relationshipStatus: 'Estado civil',
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
      title: 'Medicamentos',
      subtitle: 'Incluye los actuales y los que tomaste antes. Solo el nombre y el estado son obligatorios.',
      addLabel: 'Agregar medicamento',
      itemLabel: 'Medicamento',
      addTime: 'Agregar horario',
      linkNone: 'Otra / No sé',
      fields: {
        name: 'Nombre',
        status: 'Estado',
        forCondition: '¿Para qué lo tomas?',
        dose: 'Dosis',
        frequency: 'Frecuencia',
        frequencyDetail: 'Especificar frecuencia',
        period: 'Período aproximado',
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
    mentalHistory: {
      title: 'Antecedentes personales de salud mental',
      subtitle: 'Diagnósticos o problemas de salud mental que hayas tenido tú.',
      addLabel: 'Agregar antecedente',
      pickLabel: 'Condición',
      otherOption: 'Otro',
      itemLabel: 'Condición',
      fields: {
        origin: '¿Diagnosticado por un profesional?',
        diagnosisDate: 'Fecha aproximada (opcional)',
        diagnosedBy: '¿Quién lo diagnosticó?',
        observation: 'Observación (opcional)',
      },
    },
    physicalHistory: {
      title: 'Antecedentes personales de salud física',
      subtitle: 'Enfermedades físicas o crónicas que tengas o hayas tenido tú.',
      addLabel: 'Agregar antecedente',
      pickLabel: 'Condición',
      otherOption: 'Otra',
      itemLabel: 'Condición',
      severeLabel: '¿Es una condición grave, crónica o discapacitante?',
      fields: {
        origin: '¿Diagnosticado por un profesional?',
        diagnosisDate: 'Fecha aproximada (opcional)',
        diagnosedBy: '¿Quién lo diagnosticó?',
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
    motive: 'Completa todos los campos de Motivo y expectativas.',
    symptomsRequired: 'Debes registrar al menos un síntoma.',
    symptoms: 'Completa los campos obligatorios de Síntomas actuales.',
    medications: 'Completa los campos obligatorios de Medicamentos.',
    substances: 'Completa los campos obligatorios de Consumo de sustancias.',
    familyHistory: 'Completa los campos obligatorios de Antecedentes familiares.',
    mentalHistory: 'Completa los campos obligatorios de Antecedentes de salud mental.',
    physicalHistory: 'Completa los campos obligatorios de Antecedentes de salud física.',
    lifeEvents: 'Completa los campos obligatorios de Eventos importantes.',
  },

  psych: {
    view: {
      title: 'Panel del psicólogo',
      subtitle: 'Accede a cada formulario directamente desde su estado.',
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
        medications: 'Medicamentos',
        personalHistory: 'Antecedentes personales de salud',
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
      exportExcel: 'Exportar Excel',
      exportExcelAlert: 'Demo: exportación a Excel.',
      saveDraft: 'Guardar borrador',
      draftSavedAlert: 'Borrador guardado en esta demostración.',
      submit: 'Enviar formulario',
      resubmit: 'Re-enviar formulario',
      sentAlert: 'Formulario del psicólogo marcado como enviado.',
      viewResults: 'Visualizar resultados',
      backToForm: 'Volver al formulario',
      exportResults: 'Exportar resultados',
      exportResultsAlert: 'Demo: exportación de resultados.',
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
      subtitle: 'Calculada a partir de ambos formularios con la escala SAD PERSONS. Solo lectura.',
      scoreLabel: (score: number, max: number, band: string) => `${band} · ${score}/${max}`,
      recommendation: {
        derive: 'Se sugiere derivar a psiquiatría.',
        notDerive: 'Por ahora no se sugiere derivación.',
      },
      consideredTitle: 'Factores considerados en el puntaje',
      weightNote: 'Cada factor presente suma 1 punto.',
      scoredTag: '+1',
      notScoredTag: '—',
      genderNote: 'Género no considerado en el puntaje (no se indicó Hombre ni Mujer).',
      sources: {
        patient: 'Paciente',
        psych: 'Psicólogo',
        both: 'Paciente y psicólogo',
      },
      grayZone: {
        title: 'Otros factores fuera de la escala',
        subtitle:
          'Reportados en los formularios pero no considerados en el puntaje. No cambian la sugerencia; se muestran como contexto clínico.',
        empty: 'Sin factores adicionales fuera de la escala.',
        groups: {
          satisfaction: 'Satisfacción vital baja',
          substances: 'Consumo de sustancias reportado',
          antecedents: 'Antecedentes no puntuados',
          events: 'Eventos vitales y síntomas actuales',
        },
        satisfactionLine: (label: string, score: number) => `${label}: ${score}/10`,
        familyLine: (condition: string, relationship: string) => `${condition} (${relationship})`,
        historyLine: (condition: string) => condition,
        substanceLine: (substance: string) => substance,
        eventLine: (category: string) => category,
        symptomLine: (name: string, intensity: number) => `${name} · intensidad ${intensity}`,
      },
      items: {
        sex: 'Sexo masculino',
        age: 'Edad ≤ 19 o ≥ 45 años',
        depression: 'Síntomas o diagnóstico depresivo',
        previous: 'Intento de suicidio previo',
        substances: 'Uso problemático de sustancias',
        rational: 'Alteración del juicio (psicosis)',
        support: 'Red de apoyo deficiente',
        plan: 'Plan suicida estructurado',
        noSpouse: 'Sin pareja (soltero, separado, divorciado o viudo)',
        sickness: 'Enfermedad grave, crónica o discapacitante',
      },
      actions: {
        Bajo: 'Monitorear en próximas sesiones.',
        Moderado: 'Aumentar frecuencia y reforzar red de apoyo.',
        Alto: 'Evaluar derivación médica o atención presencial.',
        'Muy alto': 'Activar protocolo de urgencia clínica de forma inmediata.',
      },
    },
  },

  stats: {
    empty: 'Sin datos suficientes para mostrar.',
    overview: {
      title: 'Resumen clínico',
      subtitle: 'Datos agregados de todos los casos.',
      subtitlePersonal: 'Datos de tus formularios asignados.',
      openFull: 'Ver dashboard completo',
      forms: { title: 'Formularios', meta: 'Formularios de pacientes' },
      referral: { title: 'Derivación', meta: 'Sugerencia desde formularios enviados' },
      risk: { title: 'Riesgo clínico', meta: 'Casos con riesgo alto o inminente' },
      symptoms: { title: 'Síntomas frecuentes', meta: 'Promedio de intensidad reportada' },
    },
    dashboard: {
      title: 'Dashboard clínico',
      subtitle: 'Indicadores agregados sin exponer información identificable en los gráficos.',
      export: 'Exportar estadísticas',
      exportAlert: 'Demo: exportación de estadísticas.',
      tabs: {
        all: 'Todos los casos',
        mine: 'Mis formularios',
      },
    },
    aggregated: {
      notice: 'Vista agregada de todos los pacientes. Resume tendencias globales sin mostrar datos personales.',
      formStatus: { title: 'Estado de formularios', subtitle: 'Todos los casos registrados.' },
      referral: { title: 'Derivaciones sugeridas', subtitle: 'Según puntaje de la escala SAD PERSONS.' },
      risk: { title: 'Riesgos clínicos', subtitle: 'Nivel más alto consignado por caso.' },
      symptoms: { title: 'Síntomas reportados', subtitle: 'Frecuencia e intensidad promedio.' },
    },
    personal: {
      notice: 'Vista personal. Muestra tus formularios asignados y pendientes de acción.',
      load: {
        title: 'Mi carga actual',
        subtitle: 'Formularios donde eres responsable.',
        toReview: 'Por revisar',
        drafts: 'Borradores',
        sent: 'Enviados',
      },
      alerts: {
        title: 'Alertas clínicas',
        subtitle: 'Casos asignados con mayor prioridad.',
        highRisk: (count: number) => `${count} casos con riesgo alto o inminente`,
        pendingEval: (count: number) =>
          `${count} formularios de paciente enviados sin evaluación del psicólogo`,
        derive: (count: number) => `${count} casos con sugerencia de derivar`,
        none: 'Sin alertas para tus casos asignados.',
      },
      referral: { title: 'Mis derivaciones', subtitle: 'Resultado de tus formularios enviados.' },
      activity: { title: 'Actividad reciente', subtitle: 'Actualizaciones por día de la semana.' },
    },
    formStatus: {
      patientSent: 'Paciente enviado',
      patientPending: 'Paciente pendiente',
      psychSent: 'Psicólogo enviado',
      psychPending: 'Psicólogo pendiente',
      sent: 'Enviados',
      pending: 'Pendientes',
      draft: 'Borrador',
      notSent: 'No enviados',
    },
    referral: {
      derive: 'Derivar',
      review: 'Requiere revisión',
      notDerive: 'No derivar',
    },
    risk: {
      Bajo: 'Bajo',
      Moderado: 'Moderado',
      Alto: 'Alto',
      Inminente: 'Inminente',
      highCombined: 'Alto o inminente',
    },
    weekdays: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
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
      indication: (value: string) => `Para: ${value}`,
      pastTag: 'anterior',
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
    history: {
      line: (condition: string, origin: string, detail: string) =>
        detail ? `- ${condition}: ${origin}, ${detail}` : `- ${condition}: ${origin}`,
      severe: 'grave, crónica o discapacitante',
    },
    personalHistory: (mental: string, physical: string) =>
      `Salud mental:\n${mental}\n\nSalud física:\n${physical}`,
    suggestion: {
      derive: 'Derivar',
      notDerive: 'No derivar',
    },
    simple: {
      generalHeading: 'DATOS GENERALES',
      symptomsHeading: 'SÍNTOMAS ACTUALES',
      suggestionHeading: 'SUGERENCIA',
      score: (score: number) => `Puntaje: ${score}/10`,
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

export const RELATIONSHIP_STATUS_OPTIONS = [
  'Soltero/a',
  'Casado/a',
  'Conviviente',
  'Separado/a',
  'Divorciado/a',
  'Viudo/a',
]

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

export const MEDICATION_STATUS_OPTIONS: MedicationStatus[] = ['Actual', 'Pasado']

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

export const MENTAL_HISTORY_OPTIONS = [
  'Depresión',
  'Ansiedad',
  'Ataques de pánico',
  'Trastorno bipolar',
  'Intento de suicidio previo',
  'Autolesiones',
  'Hospitalización psiquiátrica',
  'Consumo problemático de alcohol o drogas',
  'TDAH',
  'Insomnio o trastorno del sueño',
  'Trastorno alimentario',
  'Trastorno obsesivo compulsivo (TOC)',
  'Estrés postraumático',
  'Otro',
]

export const PHYSICAL_HISTORY_OPTIONS = [
  'Hipertensión',
  'Diabetes',
  'Dislipidemia (colesterol o triglicéridos altos)',
  'Obesidad',
  'Enfermedad cardíaca',
  'Enfermedad respiratoria crónica (asma o EPOC)',
  'Enfermedad renal crónica',
  'Enfermedad hepática crónica',
  'Enfermedad tiroidea',
  'Enfermedad gastrointestinal crónica',
  'Enfermedad neurológica (epilepsia o migraña)',
  'Enfermedad neurodegenerativa',
  'Cáncer',
  'Enfermedad autoinmune',
  'VIH u otra infección crónica',
  'Dolor crónico o fibromialgia',
  'Discapacidad física o sensorial',
  'Cirugía u hospitalización relevante',
  'Otra',
]

export const DIAGNOSIS_ORIGIN_OPTIONS: DiagnosisOrigin[] = [
  'Diagnóstico médico',
  'Autopercibido',
  'En estudio',
  'No sé',
]

export const HEALTH_PROFESSIONAL_OPTIONS = [
  'Psiquiatra',
  'Médico general o de familia',
  'Neurólogo',
  'Pediatra',
  'Otro especialista',
  'No sé / No recuerdo',
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
