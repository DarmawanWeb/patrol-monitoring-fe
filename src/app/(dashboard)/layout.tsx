import type React from "react";
import BottomMenu from "@/components/shared/bottom-menu";
import Navbar from "@/components/shared/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <BottomMenu />
    </>
  );
}
