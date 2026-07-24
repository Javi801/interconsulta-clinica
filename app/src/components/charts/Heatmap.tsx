import { Fragment } from 'react'

interface HeatmapProps {
  /** Row labels, top to bottom. */
  rowLabels: string[]
  /** Column labels, left to right. */
  colLabels: string[]
  /** Case counts indexed as matrix[row][col]. */
  matrix: number[][]
  emptyLabel: string
}

function cellStyle(count: number, max: number) {
  if (count === 0) return { background: 'var(--surface-2)', color: 'var(--muted)' }
  const alpha = 0.15 + 0.85 * (count / max)
  return { background: `rgba(51, 65, 85, ${alpha})`, color: alpha > 0.55 ? '#fff' : 'var(--text)' }
}

function Heatmap({ rowLabels, colLabels, matrix, emptyLabel }: HeatmapProps) {
  const max = Math.max(...matrix.flat(), 0)

  if (max === 0) {
    return <p className="subtitle">{emptyLabel}</p>
  }

  return (
    <div
      className="heatmap"
      style={{ gridTemplateColumns: `auto repeat(${colLabels.length}, minmax(0, 1fr))` }}
    >
      <span className="heatmap-corner" />
      {colLabels.map((label) => (
        <span key={label} className="heatmap-col-label">
          {label}
        </span>
      ))}
      {rowLabels.map((rowLabel, row) => (
        <Fragment key={rowLabel}>
          <span className="heatmap-row-label">{rowLabel}</span>
          {colLabels.map((colLabel, col) => {
            const count = matrix[row]?.[col] ?? 0
            return (
              <span key={colLabel} className="heatmap-cell" style={cellStyle(count, max)}>
                {count > 0 ? count : ''}
              </span>
            )
          })}
        </Fragment>
      ))}
    </div>
  )
}

export default Heatmap
