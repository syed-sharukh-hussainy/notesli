import React, { ReactNode, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/use-search";
import { getIconFile } from "@/lib/utils";
import { File } from "lucide-react";

const SearchCommand = () => {
  const router = useRouter();

  const notebooks = useQuery(api.notebooks.getNotebooks);

  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  const noteIcon = (icon: string): ReactNode => {
    const IconFile = getIconFile(icon);

    if (IconFile) {
      return <IconFile className="h-8 w-8 text-primary" />;
    }
    return undefined;
  };

  const onSelect = (id: string) => {
    router.push(`/notebooks/${id}`);
    onClose();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Search notebooks or task collections" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Notebooks">
          {notebooks?.map((notebook) => (
            <CommandItem
              key={notebook._id}
              value={`${notebook._id}-${notebook.title}`}
              title={notebook.title}
              onSelect={() => onSelect(notebook._id)}
            >
              {notebook.icon ? (
                <div className="mr-3 h-5 w-5 text-secondary">
                  {noteIcon(notebook?.icon)}
                </div>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <p className="">{notebook.title}</p>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
