export type ScatterTone = 'success' | 'warning' | 'info' | 'danger' | 'default'

export interface ScatterPoint {
  x: number
  /** Categorical row index (0 = bottom). */
  y: number
  /** Drives the dot radius. */
  size: number
  tone: ScatterTone
  title?: string
}

interface ScatterChartProps {
  points: ScatterPoint[]
  xMax: number
  /** Row labels, bottom to top; length sets the number of categorical rows. */
  yLabels: string[]
  xLabel: string
  /** Optional dashed vertical reference line (e.g. a threshold). */
  threshold?: number
  legend: { label: string; tone: ScatterTone }[]
  emptyLabel: string
}

const TONE_COLOR: Record<ScatterTone, string> = {
  success: '#16a34a',
  warning: '#d97706',
  info: '#1d4ed8',
  danger: '#dc2626',
  default: '#475569',
}

// Fixed drawing space. The chart furniture (axes, labels, dots) is sized in these
// units and stays constant; only the number of plotted points varies with the data.
const WIDTH = 720
const HEIGHT = 300
const MARGIN = { top: 16, right: 20, bottom: 42, left: 104 }
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom

function ScatterChart({ points, xMax, yLabels, xLabel, threshold, legend, emptyLabel }: ScatterChartProps) {
  if (points.length === 0) {
    return <p className="subtitle">{emptyLabel}</p>
  }

  const rows = Math.max(yLabels.length - 1, 1)
  const plotX = (value: number) => MARGIN.left + (Math.min(Math.max(value, 0), xMax) / xMax) * PLOT_W
  const plotY = (row: number) => MARGIN.top + PLOT_H - (row / rows) * PLOT_H
  const dotRadius = (size: number) => 5 + Math.min(size, 8) * 1.5
  const xTicks = Array.from({ length: Math.floor(xMax / 2) + 1 }, (_, index) => index * 2)

  return (
    <div className="scatter">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="scatter-svg" role="img">
        {yLabels.map((label, row) => (
          <g key={label}>
            <line
              className="scatter-grid"
              x1={MARGIN.left}
              y1={plotY(row)}
              x2={WIDTH - MARGIN.right}
              y2={plotY(row)}
              vectorEffect="non-scaling-stroke"
            />
            <text className="scatter-tick" x={MARGIN.left - 10} y={plotY(row) + 4} textAnchor="end">
              {label}
            </text>
          </g>
        ))}
        {xTicks.map((tick) => (
          <text
            key={tick}
            className="scatter-tick"
            x={plotX(tick)}
            y={HEIGHT - MARGIN.bottom + 20}
            textAnchor="middle"
          >
            {tick}
          </text>
        ))}
        <text className="scatter-axis-label" x={MARGIN.left + PLOT_W / 2} y={HEIGHT - 6} textAnchor="middle">
          {xLabel}
        </text>
        {threshold !== undefined && (
          <line
            className="scatter-threshold"
            x1={plotX(threshold)}
            y1={MARGIN.top}
            x2={plotX(threshold)}
            y2={MARGIN.top + PLOT_H}
            vectorEffect="non-scaling-stroke"
          />
        )}
        {points.map((point, index) => (
          <circle
            key={point.title ?? index}
            cx={plotX(point.x)}
            cy={plotY(point.y) + (((index % 5) - 2) * 6)}
            r={dotRadius(point.size)}
            fill={TONE_COLOR[point.tone]}
            fillOpacity={0.72}
            stroke="#fff"
            strokeWidth={1.5}
          >
            {point.title && <title>{point.title}</title>}
          </circle>
        ))}
      </svg>
      <div className="legend legend-row">
        {legend.map((entry) => (
          <span key={entry.label}>
            <i style={{ background: TONE_COLOR[entry.tone] }} />
            {entry.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ScatterChart
