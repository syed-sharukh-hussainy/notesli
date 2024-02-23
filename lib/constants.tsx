import {
  BookText,
  CheckCircle,
  LayoutDashboard,
  Settings,
  Bird,
  Bone,
  Book,
  BookA,
  BookAudio,
  BookCheck,
  Cat,
  Dog,
  Egg,
  Fish,
  Rabbit,
  Rat,
  Shell,
  Snail,
  Squirrel,
  Turtle,
  Notebook,
} from "lucide-react";

export const SIDEBAR_ROUTES = [
  {
    icon: LayoutDashboard,
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: Notebook,
    href: "/notebooks",
    label: "Notebooks",
  },
  {
    icon: CheckCircle,
    href: "/collections",
    label: "Collections",
  },
  {
    icon: Settings,
    href: "/settings",
    label: "Settings",
  },
];

export const ICONS_SET = [
  {
    iconsCategory: "Office Supplies",
    icons: [
      {
        iconName: "Book",
        iconFile: Book,
      },
      {
        iconName: "Book A",
        iconFile: BookA,
      },
      {
        iconName: "Book Audio",
        iconFile: BookAudio,
      },
      {
        iconName: "Book Check",
        iconFile: BookCheck,
      },
    ],
  },
  {
    iconsCategory: "Animals",
    icons: [
      {
        iconName: "Bird",
        iconFile: Bird,
      },
      {
        iconName: "Bone",
        iconFile: Bone,
      },
      {
        iconName: "Cat",
        iconFile: Cat,
      },
      {
        iconName: "Dog",
        iconFile: Dog,
      },
      {
        iconName: "Egg",
        iconFile: Egg,
      },
      {
        iconName: "Fish",
        iconFile: Fish,
      },
      {
        iconName: "Rabbit",
        iconFile: Rabbit,
      },
      {
        iconName: "Rat",
        iconFile: Rat,
      },
      {
        iconName: "Shell",
        iconFile: Shell,
      },
      {
        iconName: "Snail",
        iconFile: Snail,
      },
      {
        iconName: "Squirrel",
        iconFile: Squirrel,
      },
      {
        iconName: "Turtle",
        iconFile: Turtle,
      },
    ],
  },
];

export const COLORS_SET = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
];

// export const COLORS_SET = [
//   "bg-red-600",
//   "bg-orange-600",
//   "bg-amber-600",
//   "bg-yellow-600",
//   "bg-lime-600",
//   "bg-green-600",
//   "bg-emerald-600",
//   "bg-teal-600",
// ];
