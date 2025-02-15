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
  image: z.instanceof(File).refine((file) => file.size < 3000000, {
    message: 'File must be less than 3MB.'
  }).refine((file) => file.type.includes("image"), { message: 'File must be an image.' })
})


export function EditImage({ data }: { data: IGame | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog } = useDialog()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    axiosInstance.post('/admin/game/' + data?.id + '/image', formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then(function (response) {
        toast({ title: response.data?.message })
        closeDialog("editDialog  ")
      })
      .catch(function (error) {
        toast({
          title: "Failed to submit",
          description: "Error: " + error + ". " + error?.response?.data?.message,
        })
      }).finally(() => setIsLoading(false))
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="w-full space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edit Game Banner</FormLabel>
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
        <Button type="submit">Submit{isLoading && <LoadingSpinner />}</Button>
      </form>
    </Form>
  )
}
