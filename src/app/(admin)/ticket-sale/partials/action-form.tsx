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
import { useDialog } from "@/hooks/use-dialog"
import { LoadingSpinner } from "@/components/loading-spinner"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { IGame } from "@/types/game"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ITicket } from "@/types/ticket"

const FormSchema = z.object({
  activity_id: z.string().min(1, {
    message: "Activity must be filled.",
  }),
  name: z.string().min(1, {
    message: "Name must be filled.",
  }),
  start_at: z.date({
    message: "Start date must be filled",
  }),
  end_at: z.date({
    message: "End date must be filled.",
  }),
  price: z.string().min(1, {
    message: "Price must be filled.",
  }),
  quantity: z.string().min(1, {
    message: "Quantity must be filled.",
  })
})

export function ActionForm({ data }: { data: ITicket | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [games, setGames] = React.useState<IGame[]>([])
  const { closeDialog } = useDialog()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      activity_id: data?.activity?.id?.toString() ?? "",
      name: data?.name ?? "",
      start_at: data?.start_at ? new Date(data.start_at) : undefined,
      end_at: data?.end_at ? new Date(data.end_at) : undefined,
      price: data?.price?.toString() ?? "",
      quantity: data?.quantity?.toString() ?? ""
    },
  })


  React.useEffect(() => {
    if (games.length === 0) {
      axiosInstance.get('/admin/games')
        .then((r) => setGames(r.data.data))
        .catch(function (error) {
          toast({
            title: "Action Failed",
            description: "Error: " + error + ". " + error?.response?.data?.message,
          })
        })
    }
  }, [games])

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const sanitizedData = {
      ...formData,
      start_at: format(formData.start_at, "yyyy-MM-dd"),
      end_at: format(formData.end_at, "yyyy-MM-dd"),
    }
    if (data?.id != null) {
      axiosInstance.put('/admin/ticket-sale/' + data?.id, sanitizedData)
        .then(function (response) {
          toast({ title: response.data?.message })
          closeDialog("editDialog")
        })
        .catch(function (error) {
          toast({
            title: "Failed to submit",
            description: "Error: " + error + ". " + error?.response?.data?.message,
          })
        }).finally(() => setIsLoading(false))
    } else {
      axiosInstance.post('/admin/ticket-sale', sanitizedData)
        .then(function (response) {
          toast({ title: response.data?.message })
          closeDialog("addDialog")
        })
        .catch(function (error) {
          toast({
            title: "Failed to submit",
            description: "Error: " + error + ". " + error?.response?.data?.message,
          })
        }).finally(() => setIsLoading(false))
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
        <FormField
          control={form.control}
          name="activity_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity ID</FormLabel>
              <FormControl>
                <Input readOnly disabled autoComplete="" placeholder="Activity ID (auto)" {...field} />
              </FormControl>
              <FormDescription>
                Activity ID
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
              <FormLabel>Ticket Name</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="Ticket name" {...field} />
              </FormControl>
              <FormDescription>
                Name of the ticket.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start At</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the start date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End At</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the end date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="Set price" {...field} />
              </FormControl>
              <FormDescription>
                Input the price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="Set quantity" {...field} />
              </FormControl>
              <FormDescription>
                Input the quantity.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit{isLoading && <LoadingSpinner />}</Button>
      </form>
    </Form>
  )
}
