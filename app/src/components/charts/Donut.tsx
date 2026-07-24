export type DonutTone = 'success' | 'warning' | 'info' | 'danger' | 'default'

export interface DonutSegment {
  label: string
  value: number
  tone: DonutTone
}

interface DonutProps {
  segments: DonutSegment[]
  /** Formats the value shown next to each legend entry. Defaults to the raw count. */
  formatValue?: (value: number, total: number) => string
  emptyLabel: string
}

const TONE_COLOR: Record<DonutTone, string> = {
  success: '#16a34a',
  warning: '#d97706',
  info: '#1d4ed8',
  danger: '#dc2626',
  default: '#475569',
}

function Donut({ segments, formatValue, emptyLabel }: DonutProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  if (total === 0) {
    return <p className="subtitle">{emptyLabel}</p>
  }

  let cursor = 0
  const stops = segments
    .filter((segment) => segment.value > 0)
    .map((segment) => {
      const start = (cursor / total) * 100
      cursor += segment.value
      const end = (cursor / total) * 100
      return `${TONE_COLOR[segment.tone]} ${start}% ${end}%`
    })

  return (
    <div className="donut-wrap">
      <div className="donut" style={{ background: `conic-gradient(${stops.join(', ')})` }} aria-hidden />
      <div className="legend">
        {segments.map((segment) => (
          <span key={segment.label}>
            <i style={{ background: TONE_COLOR[segment.tone] }} />
            {segment.label} {formatValue ? formatValue(segment.value, total) : segment.value}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Donut
