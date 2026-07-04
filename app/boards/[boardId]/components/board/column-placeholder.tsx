"use client";

import { useDroppable } from "@dnd-kit/react";
import { type ReactNode } from "react";

interface ColumnPlaceholderProps {
  children: ReactNode;
}

const ColumnPlaceholder = ({ children }: ColumnPlaceholderProps) => {
  const { ref } = useDroppable({
    id: "column-placeholder",
    accept: ["column"],
  });

  return (
    <li
      ref={ref}
      className="flex flex-col align-center shrink-0 w-72 min-w-72 h-fit"
    >
      {children}
    </li>
  );
};

export default ColumnPlaceholder;
