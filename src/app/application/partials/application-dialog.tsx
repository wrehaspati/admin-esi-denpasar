import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDialog } from "@/hooks/use-dialog";
import { ApplicationForm } from "./application-form";
 
export function ApplicationDialog() {
  const { dialogs, closeDialog } = useDialog();

  return (
    <Dialog open={dialogs["dialogEditApplication"]?.isOpen} onOpenChange={() => closeDialog("dialogEditApplication")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Edit Application</DialogTitle>
          <DialogDescription>
            Edit the application&apos;s information.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm application={dialogs["dialogEditApplication"]?.currentItem} />
      </DialogContent>
    </Dialog>
  )
};