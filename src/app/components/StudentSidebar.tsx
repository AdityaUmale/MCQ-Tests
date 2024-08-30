"use client";
import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconDashboard,
  IconClipboardList,
  IconChartBar,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { Logo } from "./Sidebar";
import { useSession } from "next-auth/react";
import { doLogout } from "../actions/authActions";

export function StudentSidebar() {
    const session = useSession()

    function handleLogout() {
        doLogout();
    }

  const links = [
    {
      label: "Dashboard",
      href: "/student/dashboard",
      icon: <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "View Tests",
      href: "/student/tests",
      icon: <IconClipboardList className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "My Results",
      href: "/student/results",
      icon: <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
   
  ];

  return (
    <Sidebar>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
             <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200"
            >
              <IconLogout className="h-5 w-5 flex-shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}