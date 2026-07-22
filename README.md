# Plataforma de Derivación Psicológica a Psiquiatría

Plataforma que apoya el proceso de derivación de pacientes desde atención psicológica a psiquiatría.

## ¿Qué hace?

1. El paciente completa una única vez un formulario de antecedentes y síntomas.
2. El psicólogo revisa la información junto al paciente y puede editarla mediante un PIN.
3. El psicólogo completa su propia evaluación clínica.
4. El sistema calcula un puntaje y sugiere si corresponde o no una derivación psiquiátrica.
5. El psicólogo valida o rechaza la sugerencia.
6. Se genera un resumen simple y un documento dirigido al psiquiatra.
7. El envío de documentos es siempre manual y externo a la plataforma.

## Roles

- **Paciente**: completa y envía su formulario; solo puede editarlo con un PIN entregado por un psicólogo.
- **Psicólogo**: accede a todos los pacientes, completa la evaluación clínica, genera resultados y edita el documento para el psiquiatra.
- **Administrador**: gestiona usuarios, preguntas, opciones, reglas de puntaje y umbrales.
- **Psiquiatra**: no tiene acceso a la plataforma; recibe el documento por vías externas.

## Etapas del proyecto (MVP)

- **MVP 1**: formularios con exportación automática a Excel como repositorio principal.
- **MVP 2**: base de datos SQL (PostgreSQL) como fuente oficial; Excel solo como exportación.
- **MVP 3**: generación asistida por IA del documento para el psiquiatra, siempre editable y revisado por el psicólogo.

## Tecnología

- **Frontend**: React, primero versión web y luego versión móvil.
