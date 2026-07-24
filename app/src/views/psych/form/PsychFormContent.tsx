import Card from '../../../components/Card'
import ChipGroup from '../../../components/ChipGroup'
import { REFERRAL_REASON_OPTIONS, TEXT } from '../../../text'
import { computeSadPersons } from '../../../utils/sadPersons'
import type { FormStatus, PatientForm, PsychForm, SadPersonsKey } from '../../../types'
import EvaluationCard from './EvaluationCard'
import HypothesesCard from './HypothesesCard'
import RisksCard from './RisksCard'
import SuggestionCard from './SuggestionCard'

interface PsychFormContentProps {
  patientForm: PatientForm
  form: PsychForm
  onChange: (form: PsychForm) => void
  status: FormStatus
}

function PsychFormContent({ patientForm, form, onChange, status }: PsychFormContentProps) {
  const update =
    <K extends keyof PsychForm>(key: K) =>
    (value: PsychForm[K]) =>
      onChange({ ...form, [key]: value })

  const sadPersons = computeSadPersons(patientForm, form)

  const toggleItem = (key: SadPersonsKey, scored: boolean) =>
    onChange({ ...form, sadPersonsOverrides: { ...form.sadPersonsOverrides, [key]: scored } })

  return (
    <div className="grid">
      <EvaluationCard value={form.evaluation} onChange={update('evaluation')} status={status} />
      <HypothesesCard value={form.hypotheses} onChange={update('hypotheses')} />
      <RisksCard value={form.risks} onChange={update('risks')} />
      <Card span={6}>
        <h2>{TEXT.psych.referralReasons.title}</h2>
        <ChipGroup
          options={REFERRAL_REASON_OPTIONS}
          selected={form.referralReasons}
          onChange={update('referralReasons')}
        />
      </Card>
      <SuggestionCard
        result={sadPersons}
        valid={form.suggestionValid}
        onToggle={toggleItem}
        onValidChange={update('suggestionValid')}
      />
    </div>
  )
}

export default PsychFormContent
