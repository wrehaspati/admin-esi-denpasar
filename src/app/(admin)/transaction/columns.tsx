"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleCheckIcon, CircleMinusIcon, CircleStopIcon, CircleXIcon, Eye, PlusCircleIcon } from "lucide-react"
import { ITransaction } from "@/types/transaction"
import FormatToRupiah from "@/lib/format-to-rupiah"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { ITicket } from "@/types/ticket"
import { ICompetitionRegistration } from "@/types/competition"

export const columns: ColumnDef<ITransaction>[] = [
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
    accessorKey: "transaction_id",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction ID
          <ArrowUpDown />
        </Button>
      )
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
    accessorKey: "method",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Method
          <ArrowUpDown />
        </Button>
      )
    },
    cell(props) {
      const data = props.row.original;
      return (
        <Popover>
          <PopoverTrigger className="flex gap-2 items-center">{data?.method}<PlusCircleIcon className="size-4" /></PopoverTrigger>
          <PopoverContent>
            <div className="p-2 grid grid-cols-2 gap-2">
              <p className="text-sm font-semibold">Payment Method</p>
              <p className="text-sm">&ldquo;{data?.method}&ldquo;</p>
              <p className="text-sm font-semibold">Account Number</p>
              <p className="text-sm">&ldquo;{data?.bank_account?.account_number}&ldquo;</p>
              <p className="text-sm font-semibold">Account Name</p>
              <p className="text-sm">&ldquo;{data?.bank_account?.account_name}&ldquo;</p>
            </div>
          </PopoverContent>
        </Popover>
      )
    }
  },
  {
    accessorKey: "total_price",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown />
        </Button>
      )
    },
    cell(props) {
      const data = props.row.original;
      return <span>{FormatToRupiah(data?.total_price)}</span>
    },
  },
  {
    accessorKey: "proof_image",
    header: "Receipt",
    cell(props) {
      const data = props.row.original;
      return (
        <Dialog>
          <DialogTrigger className="flex gap-2 items-center">View<Eye className="size-4" /></DialogTrigger>
          <DialogContent className="max-h-screen overflow-y-auto no-scrollbar">
            <DialogHeader>
              <DialogTitle className="text-sm">{data?.created_at} | {data?.method} | {FormatToRupiah(data?.total_price)}</DialogTitle>
              <DialogDescription>
                <Image src={data?.proof_image} alt="receipt" className="w-full h-auto" width={500} height={500} />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="ghost" onClick={() => window.open(data?.proof_image, '_blank')}>Open in new Tab</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    accessorKey: "orders",
    header: "Orders",
    cell(props) {
      const data = props.row.original;
      return (
        <Popover>
          <PopoverTrigger className="flex gap-2 items-center">Order:{data.orders.length}<PlusCircleIcon className="size-4" /></PopoverTrigger>
          <PopoverContent className="space-y-2">
            {data.orders.map((order, index) => (
              <Card key={index} className="p-2">
                <div className="font-semibold">
                  {"ticket_type" in order.orderable ?
                    (order.orderable as ITicket)?.activity?.name : (order.orderable as ICompetitionRegistration)?.competition?.activity?.name}
                </div>
                <div className="text-sm">
                  {"ticket_type" in order.orderable ? (order.orderable as ITicket)?.name : (order.orderable as ICompetitionRegistration)?.competition?.game?.name}
                </div>
                <div className="text-sm font-light">
                  { "ticket_type" in order.orderable ? FormatToRupiah((order.orderable as ITicket)?.price) : FormatToRupiah((order.orderable as ICompetitionRegistration)?.competition?.price)} 
                  x 
                  {order.quantity} 
                  Pcs</div>
              </Card>
            ))}
          </PopoverContent>
        </Popover>
      )
    },
  },
  {
    accessorKey: "user.email",
    enableColumnFilter: true,
    header: "Purchase By",
  },
  {
    accessorKey: "status",
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      )
    },
    cell(props) {
      const status = props.row.original;
      switch (status.status) {
        case "pending":
          return <div className="flex items-center gap-1"><CircleMinusIcon className="text-yellow-600" /> Pending</div>
        case "success":
          return <div className="flex items-center gap-1"><CircleCheckIcon className="text-green-600" />Success</div>
        case "failed":
          return <div className="flex items-center gap-1"><CircleXIcon className="text-red-600" />Failed</div>
        case "expired":
          return <div className="flex items-center gap-1"><CircleStopIcon className="text-muted-foreground" />Expired</div>
        default:
          return "Undefined"
      }
    },
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
