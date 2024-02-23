"use client";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { COLORS_SET } from "@/lib/constants";

interface ColorPickerProps {
  onChange: (icon: string) => void;
  value: string;
}

const ColorPicker = ({ onChange, value }: ColorPickerProps) => {
  return (
    <Popover modal={true}>
      <PopoverTrigger>
        <div className="w-fit flex items-center justify-center border rounded-md hover:bg-secondary transition p-3">
          <div
            style={{
              backgroundColor: value,
            }}
            className="w-5 h-5 rounded-full"
          ></div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <div className="flex w-52 flex-wrap gap-2 border justify-center p-5 rounded-md">
          {COLORS_SET.map((item, index) => (
            <div
              style={{
                backgroundColor: item,
              }}
              onClick={() => onChange(item)}
              key={index}
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
