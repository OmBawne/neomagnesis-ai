'use client'

interface SparklineProps {
  data: number[]
  color: string
  width?: number
  height?: number
  strokeWidth?: number
}

export default function Sparkline({
  data,
  color,
  width = 120,
  height = 40,
  strokeWidth = 1.5,
}: SparklineProps) {
  if (!data || data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const padX = 2
  const padY = 4
  const innerW = width - padX * 2
  const innerH = height - padY * 2

  const points = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * innerW
    const y = padY + innerH - ((v - min) / range) * innerH
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })

  const polyline = points.join(' ')

  // Build area fill path
  const first = points[0].split(',')
  const last = points[points.length - 1].split(',')
  const areaPath = `M ${first[0]},${first[1]} L ${points.join(' L ')} L ${last[0]},${height} L ${first[0]},${height} Z`

  const gradientId = `spark-${color.replace('#', '').replace(/[^a-z0-9]/gi, '')}-${Math.random().toString(36).slice(2, 6)}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradientId})`} />
      {/* Line */}
      <polyline
        points={polyline}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.9}
      />
    </svg>
  )
}
