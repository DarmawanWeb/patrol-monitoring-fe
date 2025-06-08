import { NavItem } from "@/types/nav-item";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Patrol Area",
    url: "/dashboard/patrol-area",
    icon: "laptop",
    shortcut: ["m", "d"],
    items: [],
  },
  {
    title: "Robots",
    url: "/dashboard/product",
    icon: "product",
    shortcut: ["p", "p"],
    isActive: false,
    items: [],
  },
];
