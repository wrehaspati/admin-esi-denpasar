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
import { FormFieldWrapper } from "@/components/form-field-wrapper"
import { Form } from "@/components/ui/form"
import { ILeaderboard } from "@/types/leaderboard"

/**
 * Configuration for the form submission
 */
const requestURL = {
  // Modify this to match the form configuration
  editURL: "/admin/leaderboard/",
  addURL: "/admin/leaderboard/",
}

type DataType = ILeaderboard // Modify this to match the data type

// Modify this to match the data type
const FormSchema: z.ZodType<DataType> = z.object({
  id: z.string(),
  is_approved: z.string(),
})

export function ActionForm({ data }: { data: DataType | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog } = useDialog()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // Modify this to match the data type
      id: data?.id?.toString() ?? "",
      is_approved: data?.is_approved ?? "",
    },
  })

  /**
   * Submit form data
   * @param formData 
   */
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const parsedData = {
      ...formData,
      is_approved: formData.is_approved === "true",
    };
    axiosInstance.put(requestURL.editURL + parsedData.id, parsedData)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-6">
        {/* Modify using form field warpper component! */}
        <FormFieldWrapper control={form.control} label="Is Approved" name="is_approved" options={[{ value: "true", label: "Accept" }, { value: "false", label: "Reject" }]} description="Is this request approved?" type="select" />
        {/* Submit Button */}
        <Button type="submit">Submit{isLoading && (<LoadingSpinner />)}</Button>
      </form>
    </Form>
  )
}
