"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./partials/action-cell"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleCheckIcon, CircleXIcon } from "lucide-react"
import { ILeaderboard } from "@/types/leaderboard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define the data type for the table
type DataType = ILeaderboard

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

  {
    accessorKey: "tournament_name",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tournament Name
          <ArrowUpDown />
        </Button>
      )
    }
  },
  {
    accessorKey: "team_name",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team Name
          <ArrowUpDown />
        </Button>
      )
    }
  },
  {
    accessorKey: "rank",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown />
        </Button>
      )
    }
  },
  {
    accessorKey: "is_approved",
    enableColumnFilter: true,
    header: "Status",
    cell: ({ row }) => {
      const leaderboard = row.original;
      switch(leaderboard.is_approved) {
        case "true":
          return <CircleCheckIcon className="text-green-600" />
        case "false":
          return <CircleXIcon className="text-red-600" />
        default:
          return "Undefined"
      }
    }
  },
  {
    accessorKey: "game",
    accessorFn: (data) => data?.game?.name,
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Game
          <ArrowUpDown />
        </Button>
      )
    }
  },
  {
    accessorKey: "category",
    accessorFn: (data) => data?.category?.name,
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown />
        </Button>
      )
    },
    cell(props) {
      return (props.row.original.category?.name)
    },
  },
  {
    accessorKey: "user",
    accessorFn: (data) => data?.user?.email,
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown />
        </Button>
      )
    }
  },
  {
    accessorKey: "players",
    enableColumnFilter: true,
    header: "Players",
    cell(props) {
      const data = props.row.original.players
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Nickname</TableHead>
              {/* <TableHead>Game ID</TableHead> */}
              {/* <TableHead>Point</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data ?? []).map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.nickname}</TableCell>
                {/* <TableCell>{item.id_game}</TableCell> */}
                {/* <TableCell>{item.point}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    },
  },
  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Created At
  //         <ArrowUpDown />
  //       </Button>
  //     )
  //   }
  // },
  // {
  //   accessorKey: "updated_at",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Updated At
  //         <ArrowUpDown />
  //       </Button>
  //     )
  //   }
  // },
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
