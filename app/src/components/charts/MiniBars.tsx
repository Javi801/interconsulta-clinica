export type BarTone = 'default' | 'success' | 'warning' | 'danger'

export interface BarItem {
  label: string
  value: number
  tone?: BarTone
}

interface MiniBarsProps {
  items: BarItem[]
  /** Denominator for bar widths. Defaults to the sum of values (proportion of the group). */
  max?: number
  /** 'stacked' puts the label on its own line above the bar, for long labels. */
  layout?: 'inline' | 'stacked'
}

function MiniBars({ items, max, layout = 'inline' }: MiniBarsProps) {
  const denominator = Math.max(max ?? items.reduce((total, item) => total + item.value, 0), 1)

  return (
    <div className={`mini-bars${layout === 'stacked' ? ' stacked' : ''}`}>
      {items.map((item) => {
        const width = Math.min((item.value / denominator) * 100, 100)
        const toneClass = item.tone && item.tone !== 'default' ? ` ${item.tone}` : ''
        return (
          <div key={item.label} className="mini-bar">
            <span>{item.label}</span>
            <div className="bar-track">
              <span className={`bar-fill${toneClass}`} style={{ width: `${width}%` }} />
            </div>
            <strong>{item.value}</strong>
          </div>
        )
      })}
    </div>
  )
}

export default MiniBars
