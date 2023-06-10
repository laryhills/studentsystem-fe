"use client";

import { Navbar } from "@/app/components/Navbar";
import { SideBar } from "@/app/components/SideBar";

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Page content here */}
        <main className="bg-[#E4D9B4] text-neutral h-full">{children}</main>
      </div>
      <SideBar />
    </div>
  );
}
