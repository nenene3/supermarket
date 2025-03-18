import React, { ReactNode } from "react";

type Props = {
  cols: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
  children: ReactNode;
};

// Define a mapping of valid grid column values
const gridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

const Grid: React.FC<Props> = ({ children, cols, sm, md, lg, xl, className = "" }) => {
  return (
    <div
      className={`grid gap-4 ${gridCols[cols]} 
        ${sm ? `sm:${gridCols[sm]}` : ""} 
        ${md ? `md:${gridCols[md]}` : ""} 
        ${lg ? `lg:${gridCols[lg]}` : ""} 
        ${xl ? `xl:${gridCols[xl]}` : ""} 
        ${className}`}
    >
      {children}
    </div>
  );
};

export default Grid;
