"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./action-cell"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CircleCheckIcon, CircleMinusIcon, CircleXIcon, Eye, PlusCircleIcon } from "lucide-react"
import { ITransaction } from "@/types/transaction"
import FormatToRupiah from "@/lib/format-to-rupiah"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"

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
          <PopoverTrigger className="flex gap-2 items-center">{data.method}<PlusCircleIcon className="size-4" /></PopoverTrigger>
          <PopoverContent>
            <div className="p-2 grid grid-cols-2 gap-2">
              <p className="text-sm font-semibold">Payment Method</p>
              <p className="text-sm">&ldquo;{data.method}&ldquo;</p>
              <p className="text-sm font-semibold">Account Number</p>
              <p className="text-sm">&ldquo;{data.bank_account.account_number}&ldquo;</p>
              <p className="text-sm font-semibold">Account Name</p>
              <p className="text-sm">&ldquo;{data.bank_account.account_name}&ldquo;</p>
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
      return <span>{FormatToRupiah(data.total_price)}</span>
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
          <DialogContent className="max-h-screen overflow-y-auto no-scrollbar max-w-6xl">
            <DialogHeader>
              <DialogTitle>{data.created_at} | {data.method} | {FormatToRupiah(data.total_price)}</DialogTitle>
              <DialogDescription>
                <Image src={data.proof_image} alt="receipt" className="w-full h-auto" width={500} height={500} />
              </DialogDescription>
            </DialogHeader>
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
          <PopoverTrigger className="flex gap-2 items-center">{data.orders.length} Items<PlusCircleIcon className="size-4" /></PopoverTrigger>
          <PopoverContent>
            {data.orders.map((order, index) => (
              <Card key={index} className="p-2">
                <div className="font-semibold">{order.orderable.activity.name}</div>
                <div className="text-sm">{order.orderable.name}</div>
                <div className="text-sm font-light">{FormatToRupiah(order.orderable.price)} x {order.quantity} Pcs</div>
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
          return <CircleMinusIcon className="text-yellow-600" />
        case "success":
          return <CircleCheckIcon className="text-green-600" />
        case "rejected":
          return <CircleXIcon className="text-red-600" />
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
