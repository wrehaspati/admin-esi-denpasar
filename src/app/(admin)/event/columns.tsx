"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import FormatToRupiah from "@/lib/format-to-rupiah"
import { Event } from "@/types/EventType"

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: "name",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Name
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "organizer",
    header: "Managed By",
    cell: ({ row }) => {
      const event = row.original;
      return event.organizer?.email;
    }
  },
  {
    accessorKey: "prizepool",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Prizepool
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const event = row.original;
      return FormatToRupiah(parseFloat(event.prizepool));
    }
  },
  {
    accessorKey: "application",
    header: "Application File",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <a
          href={event.application.application_file}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          Download
        </a>
      );
    }
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const event = row.original;
      switch(event.category.id.toString()) {
        case "1":
          return "Local"
        case "2":
          return "Region"
        case "3":
          return "Nasional"
        case "4":
          return "Internasional"
        default:
          return "Undefined"
      }
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
      const event = row.original
      return <ActionsCell data={event} />;
    },
  }
]
