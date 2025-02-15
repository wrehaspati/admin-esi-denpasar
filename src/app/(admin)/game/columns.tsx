"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { IGame } from "@/types/game"

export const columns: ColumnDef<IGame>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "platform",
    header: "Platform",
  },
  {
    accessorKey: "image",
    header: "Banner Image",
    cell(props) {
      return <a target="_blank" className="text-blue-500 underline" href={props.row.original.image}>View Image</a>
    },
  },
  {
    accessorKey: "created_at",
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
  },
  {
    accessorKey: "updated_at",
    id: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown />
        </Button>
      )
    },
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
