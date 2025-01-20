"use client"

import { User } from "@/types/UserType"
import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"
import { UserRole } from "@/types/RoleType"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original
      switch (user.role.id) {
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
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original
      return <ActionsCell user={user} />;
    },
  }
]
