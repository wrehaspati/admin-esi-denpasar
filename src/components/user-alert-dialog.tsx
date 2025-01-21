"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useDialog } from "@/hooks/use-dialog";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";

const confirmDelete = async (id: string) => {
  axiosInstance.delete('/user/'+id.toString())
    .then(function (response) {
      toast({title: response.data?.message})
    })
    .catch(function (error) {
      toast({
        title: "Failed to submit",
        description: "Error: " + error + ". " + error?.response?.data?.message,
      })
    });
}

const UserAlertDialog = () => {
  const { dialogs, closeDialog } = useDialog();
  return (
    <AlertDialog open={dialogs["dialogRemoveUser"]?.isOpen} onOpenChange={() => closeDialog("dialogRemoveUser")}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {dialogs["dialogRemoveUser"]?.currentItem?.email} user account
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => confirmDelete(dialogs["dialogRemoveUser"]?.currentItem?.id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UserAlertDialog;
