"use client"

import { User } from "@/types/UserType"
import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"

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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return <ActionsCell user={user} />;
    },
  }
]
