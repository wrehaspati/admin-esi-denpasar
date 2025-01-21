import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDialog } from "@/hooks/use-dialog"
import { UserForm } from "./user-form"
 
export function UserDialog() {
  const { dialogs, closeDialog } = useDialog()

  return (
    <Dialog open={dialogs["dialogEditUser"]?.isOpen} onOpenChange={() => closeDialog("dialogEditUser")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Edit User</DialogTitle>
          <DialogDescription>
            Edit the user&apos;s information.
          </DialogDescription>
        </DialogHeader>
        <UserForm user={dialogs["dialogEditUser"]?.currentItem} />
      </DialogContent>
    </Dialog>
  )
}