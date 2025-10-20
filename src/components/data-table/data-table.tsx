"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData> {
  table: any;
}

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsScrolled(el.scrollLeft > 40); // shadow after small scroll
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
    <div
      ref={scrollRef}
      className="relative overflow-x-auto overflow-y-hidden rounded-md border bg-transparent"
    >
      <Table className="min-w-[1900px]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any, index: number) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "whitespace-nowrap bg-background",
                    index === 0 &&
                      `sticky left-0 z-20 bg-background w-[220px] min-w-[220px] max-w-[220px] border-r ${
                        isScrolled ? "shadow-[4px_0_6px_-2px_rgba(0,0,0,0.1)]" : ""
                      }`
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell: any, index: number) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "whitespace-nowrap",
                      index === 0 &&
                        `sticky left-0 z-10 bg-[hsl(var(--content-bg))] w-[220px] min-w-[220px] max-w-[220px] border-r ${
                          isScrolled ? "shadow-[4px_0_6px_-2px_rgba(0,0,0,0.1)]" : ""
                        }`
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
    </div>
    <DataTablePagination table={table} />
    </div>
  );
}
