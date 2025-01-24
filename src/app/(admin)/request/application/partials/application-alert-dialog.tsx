"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useDialog } from "@/hooks/use-dialog";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";

const confirmDelete = async (id: string) => {
  axiosInstance.delete('/admin/application/'+id.toString())
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

const ApplicationAlertDialog = () => {
  const { dialogs, closeDialog } = useDialog();
  return (
    <AlertDialog open={dialogs["dialogRemoveApplication"]?.isOpen} onOpenChange={() => closeDialog("dialogRemoveApplication")}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {'"'} {dialogs["dialogRemoveApplication"]?.currentItem?.event_name} {'" '}
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => confirmDelete(dialogs["dialogRemoveApplication"]?.currentItem?.id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ApplicationAlertDialog;
