import type { ReactNode } from 'react'

type CardSpan = 'full' | 8 | 6 | 4

interface CardProps {
  span?: CardSpan
  children: ReactNode
}

function Card({ span, children }: CardProps) {
  const spanClass = span === 'full' ? 'full' : span ? `span-${span}` : ''
  return <div className={`card${spanClass ? ` ${spanClass}` : ''}`}>{children}</div>
}

interface SectionHeadProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function SectionHead({ title, subtitle, children }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export default Card
