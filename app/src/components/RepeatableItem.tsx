import type { ReactNode } from 'react'
import { TEXT } from '../text'

interface RepeatableItemProps {
  header: ReactNode
  onRemove: () => void
  children: ReactNode
}

function RepeatableItem({ header, onRemove, children }: RepeatableItemProps) {
  return (
    <div className="repeatable">
      <div className="repeatable-head">
        <span>{header}</span>
        <button type="button" className="btn" onClick={onRemove}>
          {TEXT.common.remove}
        </button>
      </div>
      {children}
    </div>
  )
}

export default RepeatableItem
