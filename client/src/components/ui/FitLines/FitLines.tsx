import type { ReactNode } from "react";
import { type LineBudget, useFitLines } from "@/hooks/useFitLines.ts";

interface FitLinesProps {
  as?: "h1" | "h2" | "p" | "span";
  lines: LineBudget; // lines the English copy uses, per size class
  min?: number;
  className?: string;
  id?: string;
  children: ReactNode;
}

// A headline-level text that stays within its line budget in every language
// (see useFitLines)
export function FitLines({
  as: Tag = "p",
  lines,
  min,
  className,
  id,
  children,
}: FitLinesProps) {
  const ref = useFitLines<HTMLElement>(lines, min);
  return (
    // biome-ignore lint/suspicious/noExplicitAny: one ref type for every tag
    <Tag ref={ref as any} id={id} className={className}>
      {children}
    </Tag>
  );
}
