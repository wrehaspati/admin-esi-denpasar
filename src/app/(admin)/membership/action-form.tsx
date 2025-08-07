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
import { IMembership } from "@/types/membership"
import useSWR from "swr"
import { IUser } from "@/types/user"

/**
 * Configuration for the form submission
 */
const requestURL = {
  // Modify this to match the form configuration
  editURL: "/admin/memberships/",
  addURL: "/admin/memberships",
}

type DataType = IMembership // Modify this to match the data type

// Modify this to match the data type
const FormSchema: z.ZodType<DataType> = z.object({
  id: z.number(),
  name: z.string({message: "Name is required"}).min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string({message: "Address is required"}).min(5, { message: "Address must be at least 5 characters long" }),
  phone: z.string({message: "Phone number is required"}).min(10, { message: "Phone number must be at least 10 characters long" }),
  photo: z.instanceof(File).refine((file) => file.size < 3000000, {
    message: 'File must be less than 3MB.',
  }).refine((file) => file.type.includes("image"), { message: 'File must be an image.' }),
})

export function ActionForm({ data }: { data: IMembership | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog, dialogs } = useDialog()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data?.id ?? "",
      name: data?.name || "",
      email: data?.email || "",
      address: data?.address || "",
      phone: data?.phone || ""
    },
  })

  const fetcher = (url: string) => axiosInstance.get(url).then((r) => r.data)
  const { data: users } = useSWR("/admin/users", fetcher)

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
    if (dialogs["addDialog"]?.isOpen) {
      const refinedFormData = { ...formData, user_id: formData?.id }
      axiosInstance.post(requestURL.addURL, refinedFormData, { headers: { "Content-Type": "multipart/form-data" } })
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" encType="multipart/form-data">
        {/* Modify using form field warpper component! */}
        {dialogs["addDialog"]?.isOpen ? (
          <FormFieldWrapper control={form.control} label="User ID" name="id" description="User ID" placeholder="User ID" type="combobox" options={userOptions ?? []} />
        ) : (
          <FormFieldWrapper control={form.control} label="ID" name="id" description="ID Member" placeholder="ID (auto)" disabled={true} />
        )}
        <FormFieldWrapper control={form.control} label="Name" name="name" description="User's Fullname" placeholder="Fullname" />
        <FormFieldWrapper control={form.control} label="Email" name="email" description="User's Email" placeholder="Email" />
        <FormFieldWrapper control={form.control} label="Home Address" name="address" description="User's Address" placeholder="Address" />
        <FormFieldWrapper control={form.control} label="Phone" name="phone" description="User's Phone Number" placeholder="Phone Number" />
        <FormFieldWrapper control={form.control} label="Profile Picture" name="photo" description="User's Picture" placeholder="Photo" type="file" />

        {/* Submit Button */}
        <Button type="submit">Submit{isLoading && (<LoadingSpinner />)}</Button>
      </form>
    </Form>
  )
}
