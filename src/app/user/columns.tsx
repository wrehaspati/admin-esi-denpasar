"use client"

import { User } from "@/types/UserType"
import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"
import { UserRole } from "@/types/RoleType"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        name="select-all-rows"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        name="select-row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown />
        </Button>
      )
    },
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
    id: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const user = row.original
      const date = new Date(user.created_at)
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        minute: "2-digit",
        hour: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date)
      return formattedDate
    }
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original
      return <ActionsCell data={user} />
    },
  }
]
