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
import { format } from "date-fns"
import axiosInstance from "@/lib/axios"
import { Application } from "@/types/ApplicationType"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useDialog } from "@/hooks/use-dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { User } from "@/types/UserType"

const FormSchema = z.object({
  id: z.string().min(1, {
    message: "ID must be filled.",
  }),
  event_name: z.string().min(1, {
    message: "Event Name must be filled.",
  }),
  event_date: z.string().min(1, {
    message: "Event Date must be filled.",
  }),
  organizer_name: z.string().min(1, {
    message: "Organizer Name must be filled.",
  }),
  total_prizepool: z.string().min(1, {
    message: "Total Prizepool must be filled.",
  }),
  status: z.string().min(1, {
    message: "Status must be filled.",
  }),
  note: z
    .string()
    .max(160, {
      message: "Note must not be longer than 30 characters.",
    }),
  user_id: z.string().min(1, {
    message: "User must be filled.",
  })
})

export function ApplicationForm({ application }: { application: Application | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog } = useDialog()
  const [users, setUsers] = React.useState<User[]>([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: application?.id.toString() ?? "",
      event_name: application?.event_name ?? "",
      event_date: application?.event_date ?? "",
      user_id: application?.user?.id.toString() ?? "",
      organizer_name: application?.organizer_name ?? "",
      total_prizepool: application?.total_prizepool ?? "",
      status: application?.status ?? "",
      note: application?.note ?? "",
    },
  })
  React.useEffect(() => {
    if (users.length === 0) {
      console.log("fetching users")
      axiosInstance.get('/admin/users')
        .then((r) => setUsers(r.data.data))
        .catch(function (error) {
          toast({
            title: "Action Failed",
            description: "Error: " + error + ". " + error?.response?.data?.message,
          })
        })
    }
  }, [users])
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    axiosInstance.put('/admin/application/' + data?.id, data)
      .then(function (response) {
        toast({ title: response.data?.message })
        closeDialog("dialogEditApplication")
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
                <Input readOnly disabled autoComplete="" placeholder="user id" {...field} />
              </FormControl>
              <FormDescription>
                Unique Application ID.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input autoComplete="" disabled placeholder="event name" {...field} />
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
          name="event_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Event Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled
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
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Date of the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Source Email</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? users.find(
                          (user) => user.id.toString() === field.value.toString()
                        )?.email
                        : "Select user by email"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search user by email..." />
                    <CommandList>
                      <CommandEmpty>No user found.</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            value={user.id.toString()}
                            key={user.id}
                            onSelect={() => {
                              form.setValue("user_id", user.id.toString())
                            }}
                          >
                            {user.email}
                            <Check
                              className={cn(
                                "ml-auto",
                                user.id === field.value
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
                This is the email of the user who submitted the application.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizer_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organizer Name</FormLabel>
              <FormControl>
                <Input autoComplete="" disabled placeholder="organizer name" {...field} />
              </FormControl>
              <FormDescription>
                Name of the organizer group.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Application Note"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Additional note for the application.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status for the application request" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"approved"}>Approved</SelectItem>
                  <SelectItem value={"rejected"}>Rejected</SelectItem>
                  <SelectItem value={"pending"}>Pending</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div></div>
        <Button type="button" asChild>
          <a href={application?.application_file} target="_blank">
            Download Document
          </a>
        </Button>
        <Button type="submit">Submit{isLoading && (<LoadingSpinner />)}</Button>
      </form>
    </Form>
  )
}
