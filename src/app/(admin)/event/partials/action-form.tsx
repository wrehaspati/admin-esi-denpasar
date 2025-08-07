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
import { IEvent } from "@/types/event"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { IApplication } from "@/types/application"

const FormSchema = z.object({
  id: z.string(),
  application_id: z.string(),
  user_id: z.string().optional(),
  category_id: z.string().min(1, {
    message: "Category ID must be filled.",
  }),
  name: z.string().min(1, {
    message: "Event name must be filled.",
  }),
  prizepool: z.string().min(1, {
    message: "Prizepool must be filled.",
  }),
  event_logo: z.instanceof(File).optional().refine((file) => !file || file.size < 3000000, {
    message: 'File must be less than 3MB.',
  }).refine((file) => !file || file.type.includes("image"), { message: 'File must be an image.' }),
  event_banner: z.instanceof(File).optional().refine((file) => !file || file.size < 3000000, {
    message: 'File must be less than 3MB.'
  }).refine((file) => !file || file.type.includes("image"), { message: 'File must be an image.' }),
  external_link: z.string().optional(),
})

export function ActionForm({ data }: { data: IEvent | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [applications, setApplications] = React.useState<IApplication[]>([])
  const { closeDialog } = useDialog()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data?.id?.toString() ?? "",
      application_id: data?.application?.id?.toString() ?? "",
      category_id: data?.category?.id?.toString() ?? "",
      name: data?.name ?? "",
      prizepool: data?.prizepool ?? "",
      external_link: data?.external_link ?? "",
    },
  })

  React.useEffect(() => {
    if (applications.length === 0) {
      axiosInstance.get('/admin/applications')
        .then((r) => setApplications(r.data.data))
        .catch(function (error) {
          toast({
            title: "Action Failed",
            description: "Error: " + error + ". " + error?.response?.data?.message,
          })
        })
    }
  }, [applications])

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    if (data?.id != null) {
      if (formData.event_logo instanceof File || formData.event_banner instanceof File) {
        await axiosInstance.post(`/admin/event/${data.id}/image`, formData, { headers: { "Content-Type": "multipart/form-data" } })
          .then(function (response) {
            toast({ title: response.data?.message })
          })
          .catch(function (error) {
            toast({
              title: "Failed to submit",
              description: "Error: " + error + ". " + error?.response?.data?.message,
            })
            return
          }).finally(() => setIsLoading(false));
      }

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
    else {
      axiosInstance.post('/admin/event', formData, { headers: { "Content-Type": "multipart/form-data" } })
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
    }
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
          name="application_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Event Name</FormLabel>
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
                        ? applications.find(
                          (application) => application.id.toString() === field.value.toString()
                        )?.event_name
                        : "Select application"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command
                    filter={(value, search) => {
                      const app = applications.find(a => a.id.toString() === value);
                      if (!app) return -1;
                      return app.event_name.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
                    }}
                    >
                    <CommandInput placeholder="Search application by name..." />
                    <CommandList>
                      <CommandEmpty>No application found.</CommandEmpty>
                      <CommandGroup>
                      {applications.map((application) => (
                        <CommandItem
                        value={application.id.toString()}
                        key={application.id.toString()}
                        onSelect={() => {
                          form.setValue("application_id", application.id.toString())
                          form.setValue("user_id", application.user.id.toString())
                        }}
                        >
                        {application.event_name}{` [${application.status}]`}
                        <Check
                          className={cn(
                          "ml-auto",
                          application.id == field.value
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
                Select the application for the event.
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
        <FormField
          control={form.control}
          name="event_logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Logo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>
                Logo of the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event_banner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Banner</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>
                Banner of the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="external_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>External Link</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="event external link" {...field} />
              </FormControl>
              <FormDescription>
                External link for the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="col-span-2" type="submit">Submit{isLoading && (<LoadingSpinner />)}</Button>
      </form>
    </Form>
  )
}
