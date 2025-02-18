"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/axios"
import React from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useDialog } from "@/hooks/use-dialog"
import { IEvent } from "@/types/event"
import { FormFieldWrapper } from "@/components/form-field-wrapper"
import { Form } from "@/components/ui/form"

/**
 * Configuration for the form submission
 */
const requestURL = {
  // Modify this to match the form configuration
  editURL: "/admin/changeme/",
  addURL: "/admin/changeme/",
}

type DataType = { id: string } // Modify this to match the data type

// Modify this to match the data type
const FormSchema: z.ZodType<DataType> = z.object({
  id: z.string(),
})

export function ActionForm({ data }: { data: IEvent | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog } = useDialog()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // Modify this to match the data type
      id: data?.id?.toString() ?? "",
    },
  })

  /**
   * Submit form data
   * @param formData 
   */
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    axiosInstance.put(requestURL.editURL + formData?.id, formData)
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
        {/* Modify using form field warpper component! */}
        <FormFieldWrapper control={form.control} label="" name="id" description="" placeholder="" />

        {/* Submit Button */}
        <Button type="submit">Submit{isLoading && (<LoadingSpinner />)}</Button>
      </form>
    </Form>
  )
}
