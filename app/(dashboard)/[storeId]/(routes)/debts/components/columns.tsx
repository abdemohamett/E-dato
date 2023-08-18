"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type DebtColumn = {
  id: string
  name: string
  phone: string
//   total: string
  createdAt: string
}

export const columns: ColumnDef<DebtColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
//   {
//     accessorKey: "total",
//     header: "Total Debt",
//   },
  {
    id: 'actions',
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
