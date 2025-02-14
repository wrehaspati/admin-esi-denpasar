"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { IActivity } from "@/types/activity"

export const columns: ColumnDef<IActivity>[] = [
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
  {
    accessorKey: "name",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activity Name
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "start_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start At
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "end_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End At
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "map_link",
    header: "Map Link",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <a
          href={data.map_link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          Link
        </a>
      );
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const data = row.original;
      return data.type.name;
    }
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
      const data = row.original
      return <ActionsCell data={data} />;
    },
  }
]
