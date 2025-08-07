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
import { IGame } from "@/types/game"

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Name must be filled.",
  }),
  genre: z.string().min(1, {
    message: "Genre must be filled.",
  }),
  platform: z.string().min(1, {
    message: "Platform must be filled.",
  }),
  image: z.instanceof(File).refine((file) => file.size < 3000000, {
    message: 'File must be less than 3MB.'
  }).refine((file) => file.type.includes("image"), { message: 'File must be an image.' }).optional()
})


export function ActionForm({ data }: { data: IGame | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog } = useDialog()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data?.id.toString() ?? "",
      name: data?.name ?? "",
      genre: data?.genre ?? "",
      platform: data?.platform ?? "",
    },
  })

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (data?.id != null) {
      axiosInstance.put('/admin/game/' + formData?.id, formData)
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
      axiosInstance.post('/admin/game', formData, { headers: { "Content-Type": "multipart/form-data" } })
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
      <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input readOnly disabled autoComplete="" placeholder="unique user id (automatically)" {...field} />
              </FormControl>
              <FormDescription>
                Unique ID for user.
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
              <FormLabel>Game Name</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="Game Name" {...field} />
              </FormControl>
              <FormDescription>
                Name of the game.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="Genre" {...field} />
              </FormControl>
              <FormDescription>
                Genre of the game.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="Genre" {...field} />
              </FormControl>
              <FormDescription>
                Platform of the game.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {(data?.id == null) && (
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Banner</FormLabel>
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
                  Banner of the game.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Submit{isLoading && <LoadingSpinner />}</Button>
      </form>
    </Form>
  )
}
