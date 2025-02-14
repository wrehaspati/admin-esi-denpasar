import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useDialog } from "@/hooks/use-dialog";

interface ActionsCellProps {
  onRemoveConfirm: (id: string) => void
  dialogName: string
}

export function ActionDialog({ onRemoveConfirm }: ActionsCellProps) {
  const { dialogs, closeDialog } = useDialog();

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={dialogs["deleteDialog"]?.isOpen} onOpenChange={() => closeDialog("deleteDialog")}>
        <AlertDialogContent>
          <pre className="mt-2 w-full text-left no-scrollbar rounded-md bg-slate-950 p-4 overflow-x-auto max-h-96">
            <code className="text-white text-xs">{JSON.stringify(dialogs["deleteDialog"]?.currentItem, null, 2)}</code>
          </pre>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this data
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              onRemoveConfirm(dialogs["deleteDialog"]?.currentItem?.id)
              closeDialog("deleteDialog");
            }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
};