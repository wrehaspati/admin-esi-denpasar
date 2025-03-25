"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./partials/action-cell"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { IAthlete } from "@/types/athlete"

// Define the data type for the table
type DataType = IAthlete

export const columns: ColumnDef<DataType>[] = [
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
    enableColumnFilter: true,
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

  // Define the columns for the table here
  {
    accessorKey: "full_name",
    enableColumnFilter: true,
    header: "Full Name",
  },
  {
    accessorKey: "school_name",
    enableColumnFilter: true,
    header: "School Name",
  },
  {
    accessorKey: "domicile",
    enableColumnFilter: true,
    header: "Domicile",
  },
  {
    accessorKey: "phone_number",
    enableColumnFilter: true,
    header: "Phone Number",
  },

  {
    accessorKey: "created_at",
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
    }
  },
  {
    accessorKey: "updated_at",
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
    }
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const event = row.original
      return <ActionsCell data={event} />;
    },
  }
]
