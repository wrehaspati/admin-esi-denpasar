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
import { User } from "@/types/UserType"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { UserRole } from "@/types/RoleType"
import axiosInstance from "@/lib/axios"
import React from "react"
import { useDialog } from "@/hooks/use-dialog"
import { LoadingSpinner } from "@/components/loading-spinner"

const FormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  role_id: z.string().min(1, {
    message: "Role must be filled.",
  }),
  id: z.string().min(1, {
    message: "ID must be filled.",
  }),
  username: z.string().min(1, {
    message: "Username must be filled.",
  }),
})

export function UserForm({ user }: { user: User | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { closeDialog } = useDialog()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: user?.id.toString() ?? "undefined",
      email: user?.email ?? "undefined",
      role_id: user?.role.id.toString() ?? "undefined",
      username: user?.username ?? "undefined",
    },
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    axiosInstance.put('/user/'+data.id, data)
    .then(function (response) {
      toast({title: response.data?.message})
      closeDialog("dialogEditUser")
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input readOnly autoComplete="" placeholder="user id" {...field} />
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input autoComplete="username" placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                Unique username for user.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input readOnly autoComplete="email" placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                Email will be used for login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"undefined"} disabled>--- Select Role ---</SelectItem>
                  <SelectItem value={UserRole.ADMIN.toString()}>[{UserRole.ADMIN.toString()}] Admin</SelectItem>
                  <SelectItem value={UserRole.USER.toString()}>[{UserRole.USER.toString()}] User</SelectItem>
                  <SelectItem value={UserRole.ORGANIZER.toString()}>[{UserRole.ORGANIZER.toString()}] Event Organizer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit{isLoading && <LoadingSpinner/>}</Button>
      </form>
    </Form>
  )
}
