"use client"

import { ColumnDef } from "@tanstack/react-table"

export type User = {
  id: string
  role: number
  email: string
  token: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "token",
    header: "Token",
  },
]
