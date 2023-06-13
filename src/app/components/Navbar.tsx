import React from "react";
import { useStore } from "@/app/stores/userStore";

type Props = {
  user: any;
};

export function Navbar({ user }: Props) {
  const logout = useStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="w-full navbar bg-base-300 text-neutral">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2">Student Management System</div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          <li>
            <a>Navbar Item 1</a>
          </li>
          <li>
            <a>Navbar Item 2</a>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end z-10">
        <label tabIndex={0} className="btn m-1">
          {user.name}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a href="#" onClick={() => logout()}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
