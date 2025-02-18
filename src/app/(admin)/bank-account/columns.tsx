"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./partials/action-cell"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { IBankAccount } from "@/types/bank-account"

// Define the data type for the table
type DataType = IBankAccount

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
    accessorKey: "account_name",
    header: "Account Name",
  },
  {
    accessorKey: "bank_name",
    header: "Bank Name",
  },
  {
    accessorKey: "account_number",
    header: "Account Number",
  },
  {
    accessorKey: "is_default",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is Default
          <ArrowUpDown />
        </Button>
      )
    },
    cell(props) {
      const data = props.row.original.is_default
      return <Checkbox checked={data == "1"} disabled />
    },
  },
  {
    accessorKey: "user_id",
    accessorFn: (data) => data?.user?.email,
    header: "Email",
    enableGlobalFilter: true,
    cell(props) {
      return <span>{props.row.original.user?.email}</span>
    },
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
