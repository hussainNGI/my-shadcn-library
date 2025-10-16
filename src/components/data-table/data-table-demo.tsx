"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type Table as TanstackTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { columns } from "@/components/data-table/columns";
import { mockData } from "@/components/data-table/mock-data";

type Task = {
  id: string;
  title: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  assignee: string;
  dueDate: string;
};

export default function DataTableDemo(): React.JSX.Element {
  // correct typed states for TanStack
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    id: true,
    title: true,
    department: false,
    category: false,
    status: true,
    priority: true,
    assignee: true,
    dueDate: true,
  });
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data: mockData as Task[],
    columns: columns as ColumnDef<Task, any>[],
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* toolbar includes search + column toggles */}
      <DataTableToolbar table={table as TanstackTable<Task>} />

      {/* main table */}
      <DataTable table={table as TanstackTable<Task>} />

      {/* pagination control if you have one */}
      
    </div>
  );
}
