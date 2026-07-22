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

## Cómo ver el programa en tu navegador

Esta guía está pensada para personas sin conocimientos de programación. Solo hay que hacerlo una vez; después, ver el programa toma menos de un minuto.

### Paso 1: Instalar Node.js (solo la primera vez)

Node.js es un programa gratuito que permite que esta aplicación funcione en tu computador. Sin él, nada de lo demás funciona.

1. Entra a <https://nodejs.org/es>.
2. Descarga la versión que dice **LTS** (es la recomendada).
3. Abre el archivo descargado e instálalo como cualquier programa: presiona "Siguiente" en todo, sin cambiar ninguna opción.
4. Cuando termine, **reinicia el computador** (o al menos cierra todas las ventanas abiertas).

### Paso 2: Descargar este proyecto (solo la primera vez)

Si aún no tienes la carpeta del proyecto en tu computador:

1. En esta misma página de GitHub, presiona el botón verde **"Code"**.
2. Elige **"Download ZIP"**.
3. Descomprime el archivo descargado (clic derecho → "Extraer todo" en Windows, o doble clic en Mac).
4. Recuerda dónde quedó la carpeta (por ejemplo, en Descargas o Escritorio).

### Paso 3: Abrir la "terminal" dentro de la carpeta del proyecto

La terminal es una ventana donde se escriben órdenes para el computador. Se ve antigua, pero no hay que tenerle miedo: solo copiaremos y pegaremos comandos.

**En Windows:**

1. Abre la carpeta del proyecto (la que se llama `interconsulta-clinica`).
2. Entra a la subcarpeta `app`.
3. Haz clic en la barra de dirección de arriba (donde aparece la ruta), escribe `cmd` y presiona Enter. Se abrirá una ventana negra: esa es la terminal.

**En Mac:**

1. Abre la aplicación **Terminal** (búscala con la lupa 🔍 escribiendo "Terminal").
2. Escribe `cd ` (con un espacio después), arrastra la carpeta `app` del proyecto hacia la ventana de la Terminal y presiona Enter.

### Paso 4: Instalar las piezas del programa (solo la primera vez)

En la terminal, escribe (o copia y pega) esto y presiona Enter:

```
npm install
```

Van a aparecer muchas letras y puede demorar unos minutos. Es normal. Cuando vuelva a aparecer el cursor esperando, ya terminó.

### Paso 5: Encender el programa

En la misma terminal, escribe esto y presiona Enter:

```
npm run dev
```

Aparecerá un mensaje con una dirección parecida a esta:

```
Local: http://localhost:5173/
```

Abre tu navegador (Chrome, Edge, Safari…) y escribe esa dirección: `http://localhost:5173`. Ahí verás el programa funcionando.

### Para apagar el programa

Vuelve a la ventana de la terminal y presiona las teclas **Ctrl + C** al mismo tiempo. También puedes simplemente cerrar la ventana de la terminal.

### Las próximas veces

Ya no necesitas repetir los pasos 1, 2 ni 4. Solo:

1. Abre la terminal dentro de la carpeta `app` (paso 3).
2. Escribe `npm run dev` y presiona Enter.
3. Entra a `http://localhost:5173` en tu navegador.

### Si algo falla

- **"npm no se reconoce como un comando"**: Node.js no quedó instalado o falta reiniciar el computador. Repite el paso 1.
- **La página del navegador sale en blanco o con error**: revisa que la terminal siga abierta y que el comando `npm run dev` siga corriendo.
- **Aparece otra dirección distinta a 5173**: usa la dirección exacta que muestra tu terminal después de "Local:".
