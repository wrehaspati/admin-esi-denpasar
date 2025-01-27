import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDialog } from "@/hooks/use-dialog";
import { ActionForm } from "./action-form";

interface ActionsCellProps {
  onRemoveConfirm?: (id: string) => void
  dialogName: string
}

export function ActionDialog({ dialogName }: ActionsCellProps) {
  const { dialogs, closeDialog } = useDialog();

  return (
    <>
      {/* Edit Dialog */}
      <Dialog open={dialogs["editDialog"]?.isOpen} onOpenChange={() => closeDialog("editDialog")}>
        <DialogContent className="max-h-screen overflow-y-auto no-scrollbar max-w-3xl">
          <DialogHeader>
            <DialogTitle>{dialogName}</DialogTitle>
            <DialogDescription>
              Edit the {dialogName}&apos;s information.
            </DialogDescription>
          </DialogHeader>
          <ActionForm data={dialogs["editDialog"]?.currentItem} />
        </DialogContent>
      </Dialog>
    </>
  )
};