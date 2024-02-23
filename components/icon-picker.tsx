"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTheme } from "next-themes";
import { ScrollArea } from "./ui/scroll-area";
import { ICONS_SET } from "@/lib/constants";
import { cn, getIconFile } from "@/lib/utils";
import { Book, LucideIcon } from "lucide-react";

interface IconPickerProps {
  onChange: (icon: string) => void;
  value: string;
}

const IconPicker = ({ onChange, value }: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || "light";

  const IconFile = getIconFile(value);

  return (
    <Popover modal={true}>
      <PopoverTrigger>
        <div className="w-fit flex items-center justify-center border rounded-md hover:bg-secondary transition p-3 gap-2 text-muted-foreground">
          {IconFile && <IconFile className="w-5 h-5" />}
          <p className="text-sm">{value}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <ScrollArea className="h-80 w-96 p-5 border rounded-md">
          {ICONS_SET.map((item, index) => (
            <div key={index} className="mb-3">
              <p className="text-base font-medium pb-2">{item.iconsCategory}</p>
              <div className="grid grid-cols-6 gap-2">
                {item.icons.map((icon, index) => (
                  <div
                    key={index}
                    onClick={() => onChange(icon.iconName)}
                    className="flex items-center justify-center bg-secondary p-2 rounded-md cursor-pointer group"
                    role="button"
                  >
                    <icon.iconFile
                      className={cn(
                        "w-6 h-6 group-hover:text-primary transition",
                        value === icon.iconName
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
