import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDialog } from "@/hooks/use-dialog";
// import { EventForm } from "./event-form";
 
export function EventDialog() {
  const { dialogs, closeDialog } = useDialog();

  return (
    <Dialog open={dialogs["dialogEditEvent"]?.isOpen} onOpenChange={() => closeDialog("dialogEditEvent")}>
      <DialogContent className="max-h-screen overflow-y-auto no-scrollbar max-w-3xl">
        <DialogHeader>
          <DialogTitle>Form Edit Event</DialogTitle>
          <DialogDescription>
            Edit the event&apos;s information.
          </DialogDescription>
        </DialogHeader>
        not available yet.
        {/* <EventForm application={dialogs["dialogEditEvent"]?.currentItem} /> */}
      </DialogContent>
    </Dialog>
  )
};