import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useDialog } from "@/hooks/use-dialog";
import { IEvent } from "@/types/event";
import { useRouter } from "next/navigation";

interface ActionsCellProps {
  data: IEvent
}

export const ActionsCell: React.FC<ActionsCellProps> = ({ data }) => {
  const router = useRouter()
  const { openDialog } = useDialog()

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
        <DropdownMenuItem onClick={() => router.replace("/activity/?id="+data.id)}>View Details</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => openDialog("editDialog", data)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => openDialog("deleteDialog", data)}>Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
