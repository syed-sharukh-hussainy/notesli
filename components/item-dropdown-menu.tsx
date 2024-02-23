import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { BookOpen, MoreVertical, Pencil, Trash } from "lucide-react";

interface ItemDropdownMenuProps {
  handleOpen: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const ItemDropdownMenu = ({
  handleOpen,
  handleEdit,
  handleDelete,
}: ItemDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          size="icon"
          className="rounded-full bg-transparent group-hover:bg-secondary transition"
        >
          <MoreVertical className="group-hover:text-primary text-muted-foreground transition" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-3"
        align="start"
        side="bottom"
        forceMount
      >
        <DropdownMenuItem onClick={handleOpen}>
          <BookOpen className="mr-2 h-4 w-4" />
          <span>Open</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          <span>Trash</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ItemDropdownMenu;
