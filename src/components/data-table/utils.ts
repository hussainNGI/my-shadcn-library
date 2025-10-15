import type { Column } from "@tanstack/react-table"

export function getCommonPinningStyles<TData>({ column }: { column: Column<TData, unknown> }) {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn?.("left")
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn?.("right")

  return {
    position: isPinned ? "sticky" as const : "relative" as const,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    boxShadow: isLastLeftPinnedColumn
      ? "inset -2px 0 #e2e8f0"
      : isFirstRightPinnedColumn
      ? "inset 2px 0 #e2e8f0"
      : undefined,
    zIndex: isPinned ? 1 : 0,
    background: isPinned ? "hsl(var(--background))" : undefined,
  } as React.CSSProperties
}
