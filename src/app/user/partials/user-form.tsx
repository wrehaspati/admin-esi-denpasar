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
import { useDialog } from "@/hooks/use-dialog"
import { LoadingSpinner } from "@/components/loading-spinner"
import React from "react"

const FormSchema = z.object({
  id: z.string(),
  email: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  role_id: z.string().min(1, {
    message: "Role must be filled.",
  }),
  username: z.string().min(1, {
    message: "Username must be filled.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
})

export function UserForm({ user }: { user: User | null }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const isNullRef = React.useRef(false)
  const { closeDialog } = useDialog()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: user?.id.toString() ?? "",
      email: user?.email ?? "",
      role_id: user?.role.id.toString() ?? "",
      username: user?.username ?? "",
      password: "",
    },
  })

  React.useEffect(() => {
    if (isNullRef.current) return
    if (user) isNullRef.current = false
    if (!user) isNullRef.current = true
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (user?.id != null) {
      axiosInstance.put('/admin/user/'+data.id, data)
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
    } else {
      axiosInstance.post('/admin/user', data)
      .then(function (response) {
        toast({title: response.data?.message})
        closeDialog("dialogAddUser")
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="username" {...field} />
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
                <Input autoComplete="" placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                Email will be used for login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!user && (
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input autoComplete="" placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                Password will be used for login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        )}
        <FormField
          control={form.control}
          name="role_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user authorization role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
