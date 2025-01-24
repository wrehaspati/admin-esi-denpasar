import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDialog } from "@/hooks/use-dialog"
import { UserForm } from "./user-form"
 
export function UserDialog() {
  const { dialogs, closeDialog } = useDialog()

  return (
    <>
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
    <Dialog open={dialogs["dialogAddUser"]?.isOpen} onOpenChange={() => closeDialog("dialogAddUser")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Create User</DialogTitle>
          <DialogDescription>
            Create an user account.
          </DialogDescription>
        </DialogHeader>
        <UserForm user={null} />
      </DialogContent>
    </Dialog>
    </>
  )
}