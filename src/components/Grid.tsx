import type React from "react"

type GridProps = {
  children: React.ReactNode
  cols: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  className?: string
}

export function Grid({ children, cols, sm, md, lg, xl, className }: GridProps) {
  const gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`

  const responsiveClasses = []

  if (sm) {
    responsiveClasses.push(`sm:grid-cols-${sm}`)
  }
  if (md) {
    responsiveClasses.push(`md:grid-cols-${md}`)
  }
  if (lg) {
    responsiveClasses.push(`lg:grid-cols-${lg}`)
  }
  if (xl) {
    responsiveClasses.push(`xl:grid-cols-${xl}`)
  }

  return <div className={`grid ${responsiveClasses.join(" ")} ${className || ""}`}>{children}</div>
}

