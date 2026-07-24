export interface ColumnItem {
  label: string
  value: number
}

interface ColumnChartProps {
  columns: ColumnItem[]
  /** Value mapped to full height. Defaults to the largest value. */
  max?: number
  /** Chart height in pixels. */
  height?: number
  emptyLabel: string
}

function ColumnChart({ columns, max, height, emptyLabel }: ColumnChartProps) {
  if (columns.length === 0) {
    return <p className="subtitle">{emptyLabel}</p>
  }

  const denominator = Math.max(max ?? Math.max(...columns.map((column) => column.value)), 1)

  return (
    <div className="column-chart" style={height ? { height } : undefined}>
      {columns.map((column) => (
        <div key={column.label} className="column">
          <span style={{ height: `${Math.min((column.value / denominator) * 100, 100)}%` }} />
          <span>{column.label}</span>
        </div>
      ))}
    </div>
  )
}

export default ColumnChart
