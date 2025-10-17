"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import {
  EyeOff,
  Eye,
  GripVertical,
  Plus,
  ChevronLeft,
  MoreHorizontal,
  Columns2,
  /* RotateCcw removed/commented per request */
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  storageKey?: string;
}

/**
 * View Options
 *
 * - Title column (id === "title") is excluded from the dropdown (not shown / not draggable / not hideable)
 * - select / actions columns (if present) are preserved at edges when reordering
 * - Dragging reorders the actual table via table.setColumnOrder(...)
 * - Visibility toggles update table visibility and persist
 * - Add Column shows only hidden leaf columns
 */

export function DataTableViewOptions<TData>({
  table,
  storageKey = "data-table-view",
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"main" | "addColumn">("main");

  const pointer = useSensor(PointerSensor);
  const keyboard = useSensor(KeyboardSensor, {
    // use default keyboard coords
  });
  const sensors = useSensors(pointer, keyboard);

  // identify special edge columns if they exist
  const hasSelect = !!table.getColumn("select");
  const hasActions = !!table.getColumn("actions");

  // All leaf columns from table (in their current order)
  const allLeafCols = React.useMemo(() => table.getAllLeafColumns(), [table]);

  // Build initial arrays excluding "title" from the options list
  const initialOrderIds = React.useMemo(() => {
    // exclude title, select, actions from reorderable list
    return allLeafCols
      .filter((c) => c.id !== "title" && c.id !== "select" && c.id !== "actions")
      .map((c) => c.id);
  }, [allLeafCols]);

  // initial visibility map (for all leaf columns except title we control visibility from this panel)
  const initialVisibilityMap = React.useMemo(() => {
    const map: Record<string, boolean> = {};
    allLeafCols.forEach((c) => {
      // title always visible and not controlled here
      if (c.id === "title") return;
      map[c.id] = c.getIsVisible();
    });
    return map;
  }, [allLeafCols]);

  // state: order of reorderable columns (ids only)
  const [orderIds, setOrderIds] = React.useState<string[]>(() => {
    try {
      const s = localStorage.getItem(`${storageKey}_order`);
      if (s) {
        const parsed = JSON.parse(s) as string[];
        // ensure parsed ids still exist in current columns
        return parsed.filter((id) => initialOrderIds.includes(id));
      }
    } catch {}
    return initialOrderIds;
  });

  // state: visibility map for columns (excluding title)
  const [visibility, setVisibility] = React.useState<Record<string, boolean>>(() => {
    try {
      const s = localStorage.getItem(`${storageKey}_visibility`);
      if (s) {
        const parsed = JSON.parse(s) as Record<string, boolean>;
        // only keep keys that exist now
        const cleaned: Record<string, boolean> = {};
        Object.keys(parsed).forEach((k) => {
          if (initialOrderIds.includes(k) || allLeafCols.some((c) => c.id === k)) {
            cleaned[k] = parsed[k];
          }
        });
        return { ...initialVisibilityMap, ...cleaned };
      }
    } catch {}
    return initialVisibilityMap;
  });

  // persist helpers
  React.useEffect(() => {
    localStorage.setItem(`${storageKey}_order`, JSON.stringify(orderIds));
  }, [orderIds, storageKey]);

  React.useEffect(() => {
    localStorage.setItem(`${storageKey}_visibility`, JSON.stringify(visibility));
  }, [visibility, storageKey]);

  // apply initial visibility from storage to table on mount
  React.useEffect(() => {
    // apply visibility for each controlled column
    Object.entries(visibility).forEach(([id, visible]) => {
      const col = table.getColumn(id);
      if (col && col.getIsVisible() !== visible) {
        col.toggleVisibility(visible);
      }
    });
    // ensure title is visible
    const titleCol = table.getColumn("title");
    if (titleCol && !titleCol.getIsVisible()) {
      titleCol.toggleVisibility(true);
    }
    // set initial column order in table (preserve select/title/actions edges)
    const newOrder = [
      ...(hasSelect ? ["select"] : []),
      "title",
      ...orderIds,
      ...(hasActions ? ["actions"] : []),
    ].filter(Boolean) as string[];
    table.setColumnOrder(newOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Helper to toggle visibility (for both visible and hidden columns)
  const toggleVisibility = (id: string) => {
    const col = table.getColumn(id);
    if (!col) return;
    const newVisible = !col.getIsVisible();
    col.toggleVisibility(newVisible);
    setVisibility((p) => ({ ...p, [id]: newVisible }));
  };

  // Drag end handler: reorder ids and call table.setColumnOrder
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // active/over only include reorderable ids (we pass items as orderIds)
    const oldIndex = orderIds.indexOf(active.id as string);
    const newIndex = orderIds.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(orderIds, oldIndex, newIndex);
    setOrderIds(newOrder);

    // apply to table preserving edges
    const orderedCols = [
      ...(hasSelect ? ["select"] : []),
      "title",
      ...newOrder,
      ...(hasActions ? ["actions"] : []),
    ].filter(Boolean);
    table.setColumnOrder(orderedCols);
    // persist handled by useEffect on orderIds
  };

  // derive visible & hidden arrays for UI
  const visibleIds = orderIds.filter((id) => visibility[id] ?? true);
  const hiddenIds = allLeafCols
    .map((c) => c.id)
    .filter((id) => id !== "title" && id !== "select" && id !== "actions" && !visibleIds.includes(id));

  // Build label lookup
  const labelById: Record<string, string> = {};
  allLeafCols.forEach((c) => {
    labelById[c.id] = (c.columnDef.meta as any)?.label ?? (typeof c.columnDef.header === "string" ? c.columnDef.header : c.id);
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="md" className="ml-auto">
          <Columns2 />
          View Settings
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-3 space-y-2" align="end">
        {viewMode === "main" ? (
          <>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">View Options</h4>
              {/* Reset removed/commented per request */}
              {/* <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleReset}><RotateCcw className="h-4 w-4" /></Button> */}
            </div>

            <Separator className="my-2" />

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={orderIds} strategy={verticalListSortingStrategy}>
                {visibleIds.map((id) => (
                  <SortableItem
                    key={id}
                    id={id}
                    label={labelById[id] ?? id}
                    visible={visibility[id] ?? true}
                    onToggle={() => toggleVisibility(id)}
                  />
                ))}
              </SortableContext>
            </DndContext>

            {hiddenIds.length > 0 && (
              <>
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full justify-start text-sm"
                  onClick={() => setViewMode("addColumn")}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Column
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setViewMode("main")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h4 className="font-semibold text-sm">Add Column</h4>
            </div>
            <Separator className="my-2" />

            {hiddenIds.length === 0 ? (
              <p className="text-xs text-muted-foreground">No hidden columns</p>
            ) : (
              hiddenIds.map((id) => (
                <div key={id} className="flex items-center justify-between py-1">
                  <span className="text-sm">{labelById[id] ?? id}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleVisibility(id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

/* ---------- Sortable item component ---------- */
function SortableItem({ id, label, visible, onToggle }: { id: string; label: string; visible: boolean; onToggle: () => void; }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={cn("flex items-center justify-between py-1 rounded-md px-2", isDragging && "bg-muted/40")}>
      <div className="flex items-center space-x-2">
        <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground h-6 w-6 flex items-center justify-center">
          <GripVertical className="w-3.5 h-3.5" />
        </button>
        <span className="text-sm truncate">{label}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onToggle}>
            {visible ? <><EyeOff className="h-4 w-4 mr-2" /> Hide</> : <><Eye className="h-4 w-4 mr-2" /> Show</>}
          </DropdownMenuItem>
          {/* <DropdownMenuItem disabled>Rename (coming soon)</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
