"use client";

import { Navbar } from "@/app/components/Navbar";
import { SideBar } from "@/app/components/SideBar";
import { useState } from "react";
import { Login } from "../Login";
import { UserDetails } from "@/utils/types";
import { useStore } from "@/app/stores/userStore";

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useStore((state: { user: any }) => state.user) as UserDetails;

  if (!user) {
    return <Login />;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar user={user} />
        {/* Page content here */}
        <main className="bg-[#E4D9B4] text-neutral h-full">{children}</main>
      </div>
      <SideBar />
    </div>
  );
}
