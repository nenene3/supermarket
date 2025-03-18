import React, { ReactNode } from "react";

type Props = {
  cols: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  className?: string;
  children: ReactNode;
};

const Grid = ({
  children,
  cols = 1,
  sm,
  md,
  lg,
  xl,
  className = "",
}: Props) => {
  return (
    <div
      className={`grid grid-cols-${cols} ${
        sm ? `sm:grid-cols-${sm}` : ""
      } ${md ? `md:grid-cols-${md}` : ""} ${lg ? `lg:grid-cols-${lg}` : ""} ${
        xl ? `xl:grid-cols-${xl}` : ""
      } gap-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default Grid;
