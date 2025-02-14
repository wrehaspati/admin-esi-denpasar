"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleCheckIcon, CircleMinusIcon, CircleXIcon } from "lucide-react"
import { IApplication } from "@/types/application"
import FormatToRupiah from "@/lib/format-to-rupiah"

export const columns: ColumnDef<IApplication>[] = [
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
    accessorKey: "event_name",
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
    accessorKey: "event_date",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Date
          <ArrowUpDown />
        </Button>
      )
    }
  },
  {
    accessorKey: "organizer_name",
    header: "Organizer Name",
  },
  {
    accessorKey: "user",
    header: "Managed By",
    cell: ({ row }) => {
      const application = row.original;
      return application.user?.email;
    }
  },
  {
    accessorKey: "total_prizepool",
    header: "Total Prizepool",
    cell: ({ row }) => {
      const application = row.original;
      return FormatToRupiah(parseFloat(application.total_prizepool));
    }
  },
  {
    accessorKey: "application_file",
    header: "Application File",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <a
          href={application.application_file}
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const application = row.original;
      switch(application.status) {
        case "pending":
          return <CircleMinusIcon className="text-yellow-600" />
        case "approved":
          return <CircleCheckIcon className="text-green-600" />
        case "rejected":
          return <CircleXIcon className="text-red-600" />
        default:
          return "Undefined"
      }
    }
  },
  {
    accessorKey: "note",
    header: "Note",
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
      const application = row.original
      return <ActionsCell data={application} />;
    },
  }
]
