export type RadarTone = 'primary' | 'accent'

export interface RadarSeries {
  label: string
  values: number[]
  tone: RadarTone
}

interface RadarChartProps {
  axes: string[]
  series: RadarSeries[]
  max: number
  emptyLabel: string
}

const TONE_COLOR: Record<RadarTone, string> = {
  primary: '#94a3b8',
  accent: '#1d4ed8',
}

// Extra horizontal room in the viewBox so axis labels extending outward are not clipped.
const VIEW_W = 300
const VIEW_H = 240
const CX = VIEW_W / 2
const CY = 116
const RADIUS = 70
const LABEL_OFFSET = 14
const RINGS = [0.25, 0.5, 0.75, 1]

/** Position on the wheel for axis `index` of `count`, starting at the top. */
function anglePoint(index: number, count: number, radius: number) {
  const angle = -Math.PI / 2 + (index / count) * Math.PI * 2
  return { x: CX + radius * Math.cos(angle), y: CY + radius * Math.sin(angle) }
}

const polygon = (radii: number[]) =>
  radii
    .map((radius, index) => {
      const point = anglePoint(index, radii.length, radius)
      return `${point.x},${point.y}`
    })
    .join(' ')

function RadarChart({ axes, series, max, emptyLabel }: RadarChartProps) {
  if (axes.length < 3 || series.every((line) => line.values.every((value) => value === 0))) {
    return <p className="subtitle">{emptyLabel}</p>
  }

  const scale = (value: number) => (Math.min(Math.max(value, 0), max) / max) * RADIUS

  return (
    <div className="radar">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="radar-svg" role="img">
        {RINGS.map((ring) => (
          <polygon
            key={ring}
            className="radar-ring"
            points={polygon(axes.map(() => RADIUS * ring))}
          />
        ))}
        {axes.map((axis, index) => {
          const outer = anglePoint(index, axes.length, RADIUS)
          const label = anglePoint(index, axes.length, RADIUS + LABEL_OFFSET)
          const anchor = label.x > CX + 1 ? 'start' : label.x < CX - 1 ? 'end' : 'middle'
          return (
            <g key={axis}>
              <line className="radar-spoke" x1={CX} y1={CY} x2={outer.x} y2={outer.y} />
              <text className="radar-axis-label" x={label.x} y={label.y} textAnchor={anchor}>
                {axis}
              </text>
            </g>
          )
        })}
        {series.map((line) => (
          <polygon
            key={line.label}
            points={polygon(line.values.map(scale))}
            fill={TONE_COLOR[line.tone]}
            fillOpacity={0.18}
            stroke={TONE_COLOR[line.tone]}
            strokeWidth={2}
          />
        ))}
      </svg>
      <div className="legend">
        {series.map((line) => (
          <span key={line.label}>
            <i style={{ background: TONE_COLOR[line.tone] }} />
            {line.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default RadarChart
