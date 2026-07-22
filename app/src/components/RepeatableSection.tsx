import { useState, type ReactNode } from 'react'
import AddFromListModal from './AddFromListModal'
import Card, { SectionHead } from './Card'
import EmptyAddButton from './EmptyAddButton'

interface PickFromOptions {
  label: string
  options: string[]
  otherOption: string
}

interface RepeatableSectionProps {
  span: 'full' | 8 | 6 | 4
  title: string
  subtitle?: string
  addLabel: string
  /** When set, adding picks a name from this list (with free text for the "other" option). */
  pickFrom?: PickFromOptions
  onAdd: (name?: string) => void
  isEmpty: boolean
  children: ReactNode
}

function RepeatableSection({
  span,
  title,
  subtitle,
  addLabel,
  pickFrom,
  onAdd,
  isEmpty,
  children,
}: RepeatableSectionProps) {
  const [picking, setPicking] = useState(false)

  const handleAddClick = () => {
    if (pickFrom) setPicking(true)
    else onAdd()
  }

  const handlePick = (name: string) => {
    onAdd(name)
    setPicking(false)
  }

  return (
    <Card span={span}>
      <SectionHead title={title} subtitle={subtitle}>
        <button type="button" className="btn" onClick={handleAddClick}>
          {addLabel}
        </button>
      </SectionHead>
      {isEmpty && <EmptyAddButton label={addLabel} onClick={handleAddClick} />}
      {children}
      {picking && pickFrom && (
        <AddFromListModal
          title={addLabel}
          label={pickFrom.label}
          options={pickFrom.options}
          otherOption={pickFrom.otherOption}
          onAdd={handlePick}
          onClose={() => setPicking(false)}
        />
      )}
    </Card>
  )
}

export default RepeatableSection
