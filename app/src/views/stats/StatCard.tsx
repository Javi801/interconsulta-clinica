import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  number?: number | string
  meta?: string
  children: ReactNode
}

function StatCard({ title, number, meta, children }: StatCardProps) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      {number !== undefined && <p className="stat-number">{number}</p>}
      {meta && <p className="stat-meta">{meta}</p>}
      {children}
    </div>
  )
}

export default StatCard
