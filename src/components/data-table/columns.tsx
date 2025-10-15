"use client";

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Task = {
  id: string
  title: string
  status: "Todo" | "In Progress" | "Done"
  priority: "Low" | "Medium" | "High"
  assignee: string
  dueDate: string
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("title") as string}</span>,
    meta: {
      label: "Title",
      variant: "text",
      placeholder: "Search title...",
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("status") as Task["status"]
      const color =
        value === "Done"
          ? "text-green-600"
          : value === "In Progress"
          ? "text-blue-600"
          : "text-yellow-600"
      return <span className={color}>{value}</span>
    },
    meta: {
      label: "Status",
      variant: "select",
      options: [
        { label: "Todo", value: "Todo" },
        { label: "In Progress", value: "In Progress" },
        { label: "Done", value: "Done" },
      ],
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("priority") as string}</span>,
    meta: {
      label: "Priority",
      variant: "multiSelect",
      options: [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
      ],
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => <span>{row.getValue("assignee") as string}</span>,
    meta: {
      label: "Assignee",
      variant: "text",
      placeholder: "Search assignee...",
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => <span>{row.getValue("dueDate") as string}</span>,
    meta: {
      label: "Due Date",
      variant: "date",
    },
  },
]
