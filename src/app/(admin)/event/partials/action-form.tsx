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
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useDialog } from "@/hooks/use-dialog"
import { Event } from "@/types/EventType"

const FormSchema = z.object({
  id: z.string().min(1, {
    message: "ID must be filled.",
  }),
  category_id: z.string().min(1, {
    message: "Category ID must be filled.",
  }),
  name: z.string().min(1, {
    message: "Event name must be filled.",
  }),
  prizepool: z.string().min(1, {
    message: "Prizepool must be filled.",
  }),
})

export function ActionForm({ data }: { data: Event | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog } = useDialog()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data?.id?.toString() ?? "",
      category_id: data?.category.id.toString() ?? "",
      name: data?.name ?? "",
      prizepool: data?.prizepool ?? "",
    },
  })

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    axiosInstance.put('/admin/event/' + formData?.id, formData)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input readOnly disabled autoComplete="" placeholder="id" {...field} />
              </FormControl>
              <FormDescription>
                Unique Event ID.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="event name" {...field} />
              </FormControl>
              <FormDescription>
                Name of the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category for the event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"1"}>Local</SelectItem>
                  <SelectItem value={"2"}>Regional</SelectItem>
                  <SelectItem value={"3"}>National</SelectItem>
                  <SelectItem value={"4"}>International</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prizepool"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prizepool</FormLabel>
              <FormControl>
                <Input autoComplete="" type="number" placeholder="event prizepool" {...field} />
              </FormControl>
              <FormDescription>
                Total prizepool for the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit{isLoading && (<LoadingSpinner />)}</Button>
      </form>
    </Form>
  )
}
