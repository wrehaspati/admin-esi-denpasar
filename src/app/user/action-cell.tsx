import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/types/UserType";
import { useDialog } from "@/hooks/use-dialog";

interface ActionsCellProps {
  user: User;
}

export const ActionsCell: React.FC<ActionsCellProps> = ({ user }) => {
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
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
          Copy Password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => openDialog("dialogEditUser", user)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => openDialog("dialogRemoveUser", user)}>Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
