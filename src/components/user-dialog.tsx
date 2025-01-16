import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDialog } from "@/hooks/use-dialog";
import { UserForm } from "./user-form";
 
export function UserDialog() {
  const { isDialogOpen, closeDialog, currentUser } = useDialog();

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => closeDialog()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Edit User</DialogTitle>
          <DialogDescription>
            Edit the user&apos;s information.
          </DialogDescription>
        </DialogHeader>
        <UserForm user={currentUser} />
      </DialogContent>
    </Dialog>
  )
};