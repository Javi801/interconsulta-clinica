# Documentación funcional

Documentación de las funcionalidades de la plataforma, explica **qué hace** cada funcionalidad y **porqué**.

---

## Sugerencia de derivación (escala SAD PERSONS)

La plataforma sugiere de forma automática si un paciente debería derivarse desde atención
psicológica a psiquiatría. La sugerencia se calcula con la escala clínica **SAD PERSONS**, un instrumento de tamizaje de riesgo suicida.

> La lógica exacta es la fuente de verdad y vive en
> [`app/src/utils/sadPersons.ts`](app/src/utils/sadPersons.ts). La escala se basa en el
> "Manual Sad Persons" usado como referencia clínica del proyecto.

### Cuándo se calcula

El puntaje se obtiene combinando **ambos formularios**: el del paciente (antecedentes,
datos generales) y el del psicólogo (hipótesis clínicas y riesgos evaluados). Por eso solo tiene sentido una vez que las dos partes aportaron su información.

### Los 10 factores

Cada factor presente **suma 1 punto** (puntaje total de 0 a 10). El acrónimo SAD PERSONS nombra cada letra:

| Factor | Qué considera | Origen |
|---|---|---|
| **S** — Sexo | Puntúa solo si el paciente indicó **Hombre**. *Mujer* = 0. *No binario / Otro* = 0, pero se muestra un aviso: "género no considerado en el puntaje". | Paciente |
| **A** — Edad | Puntúa si la edad es **≤ 19** o **≥ 45** años (ambos bordes incluidos). | Paciente |
| **D** — Depresión | Puntúa si el psicólogo registra una hipótesis del grupo depresivo (nombre con "depresiv…" o "distimia"). | Psicólogo |
| **P** — Intento previo | Puntúa si el paciente reporta el antecedente "Intento de suicidio previo" **o** el psicólogo carga el riesgo "Intentos suicidas previos". | Ambos |
| **E** — Consumo de sustancias | Puntúa por juicio del psicólogo: riesgo "Consumo de sustancias con riesgo" **o** hipótesis "Consumo problemático de sustancias". | Psicólogo |
| **R** — Pérdida de racionalidad | Puntúa con el riesgo "Síntomas psicóticos con riesgo". | Psicólogo |
| **S** — Red de apoyo | Puntúa con el riesgo "Vulnerabilidad social". | Psicólogo |
| **O** — Plan estructurado | Puntúa con el riesgo "Plan suicida" **o** "Acceso a medios potencialmente letales". | Psicólogo |
| **N** — Sin pareja | Puntúan *Soltero/a*, *Separado/a*, *Divorciado/a*, *Viudo/a*. *Casado/a* y *Conviviente* = 0. | Paciente |
| **S** — Enfermedad | Puntúa si existe al menos un antecedente de salud física marcado como "grave, crónica o discapacitante". | Paciente |

### Bandas de riesgo y acción sugerida

El puntaje total se traduce en una banda de riesgo, cada una con una acción recomendada:

| Puntaje | Banda | Acción sugerida |
|---|---|---|
| 0–2 | **Bajo** | Monitorear en próximas sesiones. |
| 3–4 | **Moderado** | Aumentar frecuencia y reforzar red de apoyo. |
| 5–6 | **Alto** | Evaluar derivación médica o atención presencial. |
| ≥ 7 | **Muy alto** | Activar protocolo de urgencia clínica de forma inmediata. |

A partir de **5 puntos** la plataforma sugiere derivar a psiquiatría; por debajo, no la sugiere. La sugerencia es una recomendación de apoyo, no una decisión automática: la decisión clínica siempre es del profesional.

### Panel de sugerencia

La sección de sugerencia que ve el psicólogo muestra el puntaje, la banda, la acción y el detalle de qué factores puntuaron y cuáles no (con su origen). El puntaje se deriva siempre de lo registrado en los formularios, para mantener el cálculo trazable y consistente.

### Zona gris (factores fuera de la escala)

Además de los 10 factores, el paciente suele reportar señales que la escala SAD PERSONS no pondera. No cambian el puntaje, pero se muestran como **contexto clínico** junto a la sugerencia:

- **Satisfacción vital baja**: dimensiones de satisfacción con valor ≤ 5 (de 10).
- **Consumo de sustancias reportado**: cuando existe consumo declarado pero el factor E no puntuó por juicio del psicólogo.
- **Antecedentes no puntuados**: antecedentes familiares, de salud mental (salvo el intento previo, que sí puntúa) y de salud física no marcados como graves.
- **Eventos vitales y síntomas actuales**: eventos vitales relevantes y síntomas de alta intensidad (≥ 7 de 10).
