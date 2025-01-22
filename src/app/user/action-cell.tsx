import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { User } from "@/types/UserType"
import { useDialog } from "@/hooks/use-dialog"

interface ActionsCellProps {
  data: User
}

export const ActionsCell: React.FC<ActionsCellProps> = ({ data }) => {
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
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.id)}>
          Copy Password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => openDialog("dialogEditUser", data)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => openDialog("dialogRemoveUser", data)}>Remove</DropdownMenuItem>
      </DropdownMenuContent>  
    </DropdownMenu>
  )
}
