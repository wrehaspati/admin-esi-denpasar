import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useDialog } from "@/hooks/use-dialog";
import { IActivity } from "@/types/activity";
import { useRouter } from "next/navigation";

interface ActionsCellProps {
  data: IActivity;
}

export const ActionsCell: React.FC<ActionsCellProps> = ({ data }) => {
  const { openDialog } = useDialog();
  const router = useRouter();

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
        {data.type.flow === "competition" ? (
          <DropdownMenuItem onClick={() => router.push("/competition?id="+data.id)}>View Details</DropdownMenuItem>
        ) : (
          // Add view sold tickets
          <DropdownMenuItem onClick={() => router.push("/ticket-sale?id="+data.id)}>View Details</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {data.event_id && (
          <DropdownMenuItem onClick={() => openDialog("editDialog", data)}>Edit</DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => openDialog("deleteDialog", data)}>Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
