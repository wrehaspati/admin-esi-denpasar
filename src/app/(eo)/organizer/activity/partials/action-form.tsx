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
import React from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useDialog } from "@/hooks/use-dialog"
import { IActivity } from "@/types/activity"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ITypeEvent } from "@/types/event-type"
import { useUser } from "@/hooks/use-user"

const FormSchema = z.object({
  id: z.string(),
  type_id: z.string().min(1, {
    message: "Type ID must be filled.",
  }),
  event_id: z.string().min(1, {
    message: "Event ID must be filled.",
  }),
  name: z.string().min(1, {
    message: "Event name must be filled.",
  }),
  start_at: z.date({
    message: "Start date must be filled",
  }),
  end_at: z.date({
    message: "End date must be filled.",
  }),
  location: z.string().min(1, {
    message: "Location must be filled.",
  }),
  map_link: z.string().min(1, {
    message: "Map link must be filled.",
  }),
})

export function ActionForm({ data }: { data: IActivity | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [types, setTypes] = React.useState<ITypeEvent[]>([])
  const { closeDialog } = useDialog()
  const { activeEvent } = useUser()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data?.id?.toString() ?? "",
      type_id: data?.type?.id?.toString() ?? "",
      event_id: activeEvent?.id?.toString(),
      name: data?.name ?? "",
      start_at: data?.start_at ? new Date(data.start_at) : undefined,
      end_at: data?.end_at ? new Date(data.end_at) : undefined,
      location: data?.location ?? "",
      map_link: data?.map_link ?? "",
    },
  })
  React.useEffect(() => {
    if (types.length === 0) {
      axiosInstance.get('/eo/types')
        .then((r) => setTypes(r.data.data))
        .catch(function (error) {
          toast({
            title: "Action Failed",
            description: "Error: " + error + ". " + error?.response?.data?.message,
          })
        })
    }
  }, [types])
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const sanitizedData = {
      ...formData,
      start_at: format(formData.start_at, "yyyy-MM-dd"),
      end_at: format(formData.end_at, "yyyy-MM-dd"),
    }
    setIsLoading(true);
    if (sanitizedData.id == null || sanitizedData.id == "") {
      axiosInstance.post('/eo/activity', sanitizedData)
        .then(function (response) {
          toast({ title: response.data?.message })
          closeDialog("addDialog")
        })
        .catch(function (error) {
          toast({
            title: "Failed to submit",
            description: "Error: " + error + ". " + error?.response?.data?.message,
          })
        }).finally(() => setIsLoading(false));
    } else {
      axiosInstance.put('/eo/activity/' + sanitizedData?.id, sanitizedData)
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="event_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event ID</FormLabel>
              <FormControl>
                <Input readOnly disabled autoComplete="" placeholder="event id (auto)" {...field} />
              </FormControl>
              <FormDescription>
                Event ID.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity ID</FormLabel>
              <FormControl>
                <Input readOnly disabled autoComplete="" placeholder="activity id (auto)" {...field} />
              </FormControl>
              <FormDescription>
                Activity ID.
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
              <FormLabel>Activity Name</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="activity name" {...field} />
              </FormControl>
              <FormDescription>
                Name of the activity.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="location" {...field} />
              </FormControl>
              <FormDescription>
                Location of the event.
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
                Start Date of the event.
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
                      date < new Date("1900-01-01") || date < new Date(form.getValues("start_at"))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                End Date of the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="map_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Map Link</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="map link" {...field} />
              </FormControl>
              <FormDescription>
                Link to the location of the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Activity</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? types.find(
                          (type) => type.id.toString() === field.value.toString()
                        )?.name
                        : "Select type name"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search type..." />
                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        {types.map((type) => (
                          <CommandItem
                            value={type.id.toString()}
                            key={type.id.toString()}
                            onSelect={() => {
                              form.setValue("type_id", type.id.toString())
                            }}
                          >
                            {type.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                type.id == field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Type of the activity.
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
