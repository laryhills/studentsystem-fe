"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideBar() {
  const pathname = usePathname();

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4 w-60 h-full bg-base-200 text-neutral">
        {/* Sidebar content here */}
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <details open={pathname.includes("students")}>
            <summary>Students</summary>
            <ul>
              <li>
                <Link
                  className={pathname.includes("students/list") ? "active" : ""}
                  href="/students/list"
                >
                  List Students
                </Link>
              </li>
              <li>
                <Link
                  className={pathname.includes("students/add") ? "active" : ""}
                  href="/students/add"
                >
                  Add Student
                </Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
}
