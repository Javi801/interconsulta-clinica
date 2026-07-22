import Card from '../../../components/Card'
import ChipGroup from '../../../components/ChipGroup'
import { REFERRAL_REASON_OPTIONS } from '../../../data/seed'
import { referralSuggestion } from '../../../utils/summary'
import type { FormStatus, PsychForm } from '../../../types'
import EvaluationCard from './EvaluationCard'
import HypothesesCard from './HypothesesCard'
import RisksCard from './RisksCard'
import SuggestionCard from './SuggestionCard'

interface PsychFormContentProps {
  form: PsychForm
  onChange: (form: PsychForm) => void
  status: FormStatus
}

function PsychFormContent({ form, onChange, status }: PsychFormContentProps) {
  const update =
    <K extends keyof PsychForm>(key: K) =>
    (value: PsychForm[K]) =>
      onChange({ ...form, [key]: value })

  return (
    <div className="grid">
      <EvaluationCard value={form.evaluation} onChange={update('evaluation')} status={status} />
      <HypothesesCard value={form.hypotheses} onChange={update('hypotheses')} />
      <RisksCard value={form.risks} onChange={update('risks')} />
      <Card span={6}>
        <h2>Motivos de derivación</h2>
        <ChipGroup
          options={REFERRAL_REASON_OPTIONS}
          selected={form.referralReasons}
          onChange={update('referralReasons')}
        />
      </Card>
      <SuggestionCard
        score={form.score}
        threshold={form.threshold}
        suggestion={referralSuggestion(form)}
        valid={form.suggestionValid}
        onValidChange={update('suggestionValid')}
      />
    </div>
  )
}

export default PsychFormContent
