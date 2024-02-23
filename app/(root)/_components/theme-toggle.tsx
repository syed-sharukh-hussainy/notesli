// "use client";

// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// const ThemeToggle = () => {
//   const { theme, setTheme } = useTheme();

//   return (
//     <div
//       className="flex gap-x-3 text-sm items-center font-medium  p-3 hover:bg-secondary hover:text-primary transition-colors rounded-md cursor-pointer group"
//       onClick={() => {
//         if (theme === "dark") {
//           setTheme("light");
//         } else {
//           setTheme("dark");
//         }
//       }}
//     >
//       <Sun className="h-6 w-6 text-muted-foreground group-hover:text-primary transition dark:hidden" />
//       <Moon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition hidden dark:flex" />
//       <span className="capitalize text-muted-foreground group-hover:text-primary">
//         {theme === "light" ? "dark" : "light"} theme
//       </span>
//     </div>
//   );
// };

// export default ThemeToggle;

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="group hover:bg-primary/5 p-4 rounded-md cursor-pointer transition"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    >
      <Sun className="h-6 w-6 text-muted-foreground group-hover:text-primary transition dark:hidden" />
      <Moon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition hidden dark:flex" />
      <span className="sr-only">Toggle Theme</span>
    </div>
  );
};

export default ThemeToggle;
