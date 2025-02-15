"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 md:grid-cols-1 gap-6">
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
                  <SelectItem value={"rejected"}>Rejected</SelectItem>
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
  )
}
