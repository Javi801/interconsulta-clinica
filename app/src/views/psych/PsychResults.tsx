import Card, { SectionHead } from '../../components/Card'
import Field from '../../components/Field'
import { simpleSummary } from '../../utils/summary'
import type { PatientForm, PsychForm, ReferralReport } from '../../types'

interface PsychResultsProps {
  patientForm: PatientForm
  psychForm: PsychForm
  onReportChange: (report: ReferralReport) => void
}

const REPORT_FIELDS: { key: keyof ReferralReport; label: string }[] = [
  { key: 'request', label: '1. Solicitud de consultoría' },
  { key: 'summary', label: '2. Breve resumen' },
  { key: 'symptoms', label: '3. Síntomas actuales' },
  { key: 'medications', label: '4. Medicamentos actuales' },
  { key: 'previousTreatments', label: '5. Tratamientos de salud mental anteriores' },
  { key: 'background', label: '6. Antecedentes relevantes' },
]

function PsychResults({ patientForm, psychForm, onReportChange }: PsychResultsProps) {
  const report = psychForm.report

  return (
    <div className="grid">
      <Card span={6}>
        <SectionHead title="Resumen simple" subtitle="Información vigente.">
          <button type="button" className="btn" onClick={() => alert('Demo: resumen copiado.')}>
            Copiar
          </button>
        </SectionHead>
        <div className="summary-box">{simpleSummary(patientForm, psychForm)}</div>
      </Card>
      <Card span={6}>
        <SectionHead title="Informe para psiquiatría" subtitle="Texto editable.">
          <button type="button" className="btn" onClick={() => alert('Demo: exportación de informe.')}>
            Exportar
          </button>
        </SectionHead>
        {REPORT_FIELDS.map(({ key, label }) => (
          <Field key={key} label={label}>
            <textarea
              value={report[key]}
              onChange={(e) => onReportChange({ ...report, [key]: e.target.value })}
            />
          </Field>
        ))}
      </Card>
    </div>
  )
}

export default PsychResults
