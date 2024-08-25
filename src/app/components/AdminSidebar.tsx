"use client";
import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconDashboard,
  IconFilePlus,
  IconSend,
  IconChartBar,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { Logo } from "./Sidebar";
import { doLogout } from "../actions/authActions";
import { useRouter } from "next/navigation"; // Updated import

export function AdminSidebar() {
  const router = useRouter(); // This now works with "next/navigation"

  const handleLogout = () => {
    doLogout();
    
  };

  const links = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Create Test",
      href: "/admin/create-test",
      icon: <IconFilePlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Publish Test",
      href: "/admin/publish-test",
      icon: <IconSend className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Results",
      href: "/admin/results",
      icon: <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
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

            {/* Logout Button (no href) */}
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
