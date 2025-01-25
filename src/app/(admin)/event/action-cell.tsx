import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useDialog } from "@/hooks/use-dialog";
import { Event } from "@/types/EventType";

interface ActionsCellProps {
  data: Event;
}

export const ActionsCell: React.FC<ActionsCellProps> = ({ data }) => {
  const { openDialog } = useDialog();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => openDialog("dialogEditEvent", data)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => openDialog("dialogRemoveEvent", data)}>Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
