import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ICONS_SET } from "./constants";
import { LucideIcon } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIconFile(iconName: string): LucideIcon | undefined {
  for (const iconSet of ICONS_SET) {
    const foundIcon = iconSet.icons.find((icon) => icon.iconName === iconName);
    if (foundIcon) {
      return foundIcon.iconFile;
    }
  }
}

export function greetByTime() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning,";
  } else if (currentHour < 18) {
    greeting = "Good afternoon,";
  } else {
    greeting = "Good evening,";
  }

  return greeting;
}

export const formatText = (blocks: any) => {
  let formattedText = "";

  blocks.map((block: any) => {
    if (block.content[0]) {
      if (block.type === "heading") {
        block.content?.map((t: any) => {
          if (t.type === "text") {
            formattedText += t.text + ": ";
          }
        });
        formattedText += "\n\n";
      }

      if (block.type === "paragraph") {
        block.content?.map((t: any) => {
          if (t?.type === "text") {
            formattedText += t.text;
          }
          if (t?.type === "link") {
            t.content?.map((l: any) => {
              formattedText += l?.text;
            });
            formattedText += " (" + t?.href + ")";
          }
        });
        formattedText += "\n\n";
      }
      if (block.type === "bulletListItem") {
        block.content?.map((t: any) => {
          if (t?.type === "text") {
            formattedText += t.text;
          }
          if (t?.type === "link") {
            t.content?.map((l: any) => {
              formattedText += l?.text;
            });
            formattedText += " (" + t?.href + ")";
          }
        });
        formattedText += "\n\n";
      }
      if (block.type === "numberedListItem") {
        block.content?.map((t: any) => {
          if (t?.type === "text") {
            formattedText += t.text;
          }
          if (t?.type === "link") {
            t.content?.map((l: any) => {
              formattedText += l?.text;
            });
            formattedText += " (" + t?.href + ")";
          }
        });
        formattedText += "\n\n";
      }
    }
  });

  return formattedText;
};
