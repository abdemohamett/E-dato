"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ExpenseColumn = {
  id: string
  item: string
  amount: string
  createdAt: string
}

export const columns: ColumnDef<ExpenseColumn>[] = [
  {
    accessorKey: "item",
    header: "Item",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: 'actions',
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
