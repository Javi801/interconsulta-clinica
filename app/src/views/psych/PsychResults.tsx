import Card, { SectionHead } from '../../components/Card'
import Field from '../../components/Field'
import { TEXT } from '../../text'
import { simpleSummary } from '../../utils/summary'
import type { PatientForm, PsychForm, ReferralReport } from '../../types'

interface PsychResultsProps {
  patientForm: PatientForm
  psychForm: PsychForm
  onReportChange: (report: ReferralReport) => void
}

const REPORT_KEYS: (keyof ReferralReport)[] = [
  'request',
  'summary',
  'symptoms',
  'medications',
  'previousTreatments',
  'background',
]

function PsychResults({ patientForm, psychForm, onReportChange }: PsychResultsProps) {
  const report = psychForm.report

  return (
    <div className="grid">
      <Card span={6}>
        <SectionHead title={TEXT.psych.results.simple.title} subtitle={TEXT.psych.results.simple.subtitle}>
          <button
            type="button"
            className="btn"
            onClick={() => alert(TEXT.psych.results.simple.copyAlert)}
          >
            {TEXT.psych.results.simple.copy}
          </button>
        </SectionHead>
        <div className="summary-box">{simpleSummary(patientForm, psychForm)}</div>
      </Card>
      <Card span={6}>
        <SectionHead title={TEXT.psych.results.report.title} subtitle={TEXT.psych.results.report.subtitle}>
          <button
            type="button"
            className="btn"
            onClick={() => alert(TEXT.psych.results.report.exportAlert)}
          >
            {TEXT.psych.results.report.export}
          </button>
        </SectionHead>
        {REPORT_KEYS.map((key) => (
          <Field key={key} label={TEXT.psych.results.report.fields[key]}>
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
