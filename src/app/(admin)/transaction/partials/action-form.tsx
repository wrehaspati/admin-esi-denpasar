"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/axios"
import React from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useDialog } from "@/hooks/use-dialog"
import { ITransaction } from "@/types/transaction"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import FormatToRupiah from "@/lib/format-to-rupiah"

const FormSchema = z.object({
  status: z.string(),
})

export function ActionForm({ data }: { data: ITransaction }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog } = useDialog()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: data?.status ?? "",
    },
  })

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    axiosInstance.put('/admin/transaction/' + data?.id, formData)
      .then(function (response) {
        toast({ title: response.data?.message })
        closeDialog("editDialog")
      })
      .catch(function (error) {
        toast({
          title: "Failed to submit",
          description: "Error: " + error + ". " + error?.response?.data?.message,
        })
      }).finally(() => setIsLoading(false));
  }

  const [position, setPosition] = React.useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  if (!data) return <></>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div
        className="relative overflow-hidden w-full h-auto group max-w-sm"
        onMouseMove={handleMouseMove}
      >
        <Image
          src={data?.proof_image}
          alt="receipt"
          className="w-full h-auto transition-transform duration-300 transform md:group-hover:scale-[2]"
          width={500}
          height={500}
          style={{ transformOrigin: `${position.x} ${position.y}` }}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          <FormItem>
            <FormLabel>Payment Method</FormLabel>
            <FormControl>
              <Input autoComplete="" disabled placeholder="Payment method" value={data?.method} />
            </FormControl>
            <FormDescription>
              Payment method used for the transaction
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Total Price</FormLabel>
            <FormControl>
              <Input autoComplete="" disabled placeholder="Total price" value={FormatToRupiah(data?.total_price)} />
            </FormControl>
            <FormDescription>
              Total price of the transaction
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status for the transaction request" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"success"}>Success</SelectItem>
                    <SelectItem value={"failed"}>Failed</SelectItem>
                    <SelectItem value={"expired"}>Expired</SelectItem>
                    <SelectItem value={"pending"}>Pending</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit{isLoading && (<LoadingSpinner />)}</Button>
        </form>
      </Form>
    </div>
  )
}
