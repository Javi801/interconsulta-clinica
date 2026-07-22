import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  counter?: string
  fullWidth?: boolean
  children: ReactNode
}

function Field({ label, counter, fullWidth, children }: FieldProps) {
  return (
    <div className="field" style={fullWidth ? { gridColumn: '1 / -1' } : undefined}>
      <label>{label}</label>
      {children}
      {counter && <span className="counter">{counter}</span>}
    </div>
  )
}

export default Field
