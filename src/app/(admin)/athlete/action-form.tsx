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
import { IAthlete } from "@/types/athlete"
import { IUser } from "@/types/user"
import useSWR from "swr"

/**
 * Configuration for the form submission
 */
const requestURL = {
  // Modify this to match the form configuration
  editURL: "/admin/athlete/",
  addURL: "/admin/athlete/",
}

type DataType = { 
  id: string,
  user_id: string,
  school_name: string,
  full_name: string,
  domicile: string,
  phone_number: string
} // Modify this to match the data type

// Modify this to match the data type
const FormSchema: z.ZodType<DataType> = z.object({
  id: z.string(),
  user_id: z.string(),
  school_name: z.string(),
  full_name: z.string(),
  domicile: z.string(),
  phone_number: z.string(),
})

export function ActionForm({ data }: { data: IAthlete | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog, dialogs } = useDialog()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // Modify this to match the data type
      id: data?.id?.toString() ?? "",
      user_id: data?.user?.id ?? "",
      school_name: data?.school_name ?? "",
      full_name: data?.full_name ?? "",
      domicile: data?.domicile ?? "",
      phone_number: data?.phone_number ?? "",
    },
  })

  const fetcher = (url: string) => axiosInstance.get(url).then((r) => r.data)
  const {data: users} = useSWR("/admin/users", fetcher)

  const userOptions = users?.data?.map((user: IUser) => ({
    value: user?.id,
    label: user?.email,
  }));

  /**
   * Submit form data
   * @param formData 
   */
  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    if(dialogs["addDialog"]?.isOpen){
      axiosInstance.post(requestURL.addURL, formData)
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Modify using form field warpper component! */}
        <FormFieldWrapper control={form.control} label="ID" name="id" description="Unique ID" disabled={true} placeholder="ID (Auto)" />
        <FormFieldWrapper control={form.control} label="User ID" name="user_id" description="User ID" placeholder="User ID" type="combobox" options={userOptions ?? []} />
        <FormFieldWrapper control={form.control} label="School Name" name="school_name" description="School Name / Institutions of User" placeholder="School/Institution Name" />
        <FormFieldWrapper control={form.control} label="Domicile/Address" name="domicile" description="Domicile or Home Address of User" placeholder="Domicile / Address" />
        <FormFieldWrapper control={form.control} label="Phone" name="phone_number" description="Active Phone Number of User" placeholder="Phone Number" />
        <div></div>

        {/* Submit Button */}
        <Button type="submit">Submit{isLoading && (<LoadingSpinner />)}</Button>
      </form>
    </Form>
  )
}
