"use client"

import { User } from "@/types/UserType"
import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"
import { UserRole } from "@/types/RoleType"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "role",
    header: "Role",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      switch (user.role) {
        case UserRole.ADMIN:
          return "["+UserRole.ADMIN+"] Admin"
        case UserRole.ORGANIZER:
          return "["+UserRole.ORGANIZER+"] Organizer"
        case UserRole.USER:
          return "["+UserRole.USER+"] User"
        default:
          return "Undefined"
      }
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    header: "Created At",
    cell: ({ row }) => {
      const user = row.original;
      const date = new Date(user.created_at);
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        minute: "2-digit",
        hour: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date);
      return formattedDate;
    }
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
