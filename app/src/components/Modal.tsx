import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  children: ReactNode
}

function Modal({ open, children }: ModalProps) {
  if (!open) return null
  return (
    <div className="modal open">
      <div className="modal-card">{children}</div>
    </div>
  )
}

export default Modal
