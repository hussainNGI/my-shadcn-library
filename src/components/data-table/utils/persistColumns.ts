// src/components/data-table/utils/persistColumns.ts
import { Table } from "@tanstack/react-table"

const STORAGE_PREFIX = "datatable_state_"

export function saveTableState<TData>(table: Table<TData>, tableId: string) {
  try {
    const prefs = {
      columnVisibility: table.getState().columnVisibility,
      columnOrder: table.getState().columnOrder,
    }
    localStorage.setItem(`${STORAGE_PREFIX}${tableId}`, JSON.stringify(prefs))
  } catch (error) {
    console.warn("⚠️ Failed to save table state:", error)
  }
}

export function loadTableState<TData>(table: Table<TData>, tableId: string) {
  try {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${tableId}`)
    if (!saved) return
    const prefs = JSON.parse(saved)
    if (prefs.columnVisibility) table.setColumnVisibility(prefs.columnVisibility)
    if (prefs.columnOrder) table.setColumnOrder(prefs.columnOrder)
  } catch (error) {
    console.warn("⚠️ Failed to load table state:", error)
  }
}
