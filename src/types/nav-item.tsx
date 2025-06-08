import { Icons } from "@/components/icons";
import { TypeOf } from "zod";

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items:TypeOf NavItemWithChildren[];

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolea;
    n;
  }[];
}

https: export type MainNavItem = NavItemWithOptionalChildren;
ekwr


export type SidebarNavItem = NavItemWithChildren;
