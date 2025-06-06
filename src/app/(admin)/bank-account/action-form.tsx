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
import { IBankAccount } from "@/types/bank-account"
import useSWR from "swr"
import { IUser } from "@/types/user"

/**
 * Configuration for the form submission
 */
const requestURL = {
  // Modify this to match the form configuration
  editURL: "/admin/bank-account/",
  addURL: "/admin/bank-account",
}

type DataType = IBankAccount // Modify this to match the data type

// Modify this to match the data type
const FormSchema = z.object({
  id: z.string({message: "ID is required" }),
  user_id: z.number({message: "User ID is required" }),
  bank_name: z.string().min(3, { message: "Bank name must be at least 3 characters long" }),
  account_name: z.string().min(3, { message: "Account name must be at least 3 characters long" }),
  account_number: z.string().min(3, { message: "Account number must be at least 3 characters long" }),
  is_default: z.boolean(),
})

export function ActionForm({ data }: { data: DataType | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog, dialogs } = useDialog()

  const fetcher = (url: string) => axiosInstance.get(url).then((r) => r.data)
  const {data: users} = useSWR("/admin/users", fetcher)

  const userOptions = users?.data?.map((user: IUser) => ({
    value: user?.id,
    label: user?.email,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // Modify this to match the data type
      id: data?.id?.toString() ?? "",
      user_id: data?.user?.id ? parseInt(data.user.id) : undefined,
      bank_name: data?.bank_name ?? "",
      account_name: data?.account_name ?? "",
      account_number: data?.account_number ?? "",
      is_default: data?.is_default ? true : false,
    },
  })

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
        <FormFieldWrapper control={form.control} label="ID" name="id" description="Bank account ID in system" placeholder="ID (auto)" disabled={true} />
        <FormFieldWrapper control={form.control} label="User ID" name="user_id" description="User ID" placeholder="User ID" type="combobox" options={userOptions ?? []} />
        <FormFieldWrapper control={form.control} label="Bank Name" name="bank_name" description="Bank Name" placeholder="Bank Name" />
        <FormFieldWrapper control={form.control} label="Account Name" name="account_name" description="Account Name" placeholder="Account Name" />
        <FormFieldWrapper control={form.control} label="Account Number" name="account_number" description="Account Number" placeholder="Account Number" />
        <FormFieldWrapper control={form.control} label="Is Default" name="is_default" description="Make the value as a default option for transactions" placeholder="Check to make it default" type="checkbox" />

        {/* Submit Button */}
        <Button type="submit">Submit{isLoading && (<LoadingSpinner />)}</Button>
      </form>
    </Form>
  )
}
