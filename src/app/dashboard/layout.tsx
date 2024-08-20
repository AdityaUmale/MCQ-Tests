"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconBuildingCommunity,
  IconBuildingStore,
  IconSchool,
  IconBed,
  IconMapPin,
  IconBuildingSkyscraper,
  IconUsers,
  IconUserCircle,
  IconLogout,
  IconBooks,
  IconBuildingCottage,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
  
    const getLinksForRole = (role: string) => {
      const commonLinks = [
        {
          label: "Profile",
          href: "/dashboard/profile",
          icon: <IconUserCircle className="h-5 w-5 flex-shrink-0" />,
        },
        {
          label: "Settings",
          href: "/dashboard/settings",
          icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
        },
        {
          label: "Logout",
          href: "/api/auth/signout",
          icon: <IconLogout className="h-5 w-5 flex-shrink-0" />,
        },
      ];
  
      const roleSpecificLinks: Record<string, Array<{ label: string; href: string; icon: React.ReactNode }>> = {
        student: [
          { label: "Study Centers", href: "/dashboard/study-centers", icon: <IconBuildingCommunity className="h-5 w-5 flex-shrink-0" /> },
          { label: "Libraries", href: "/dashboard/libraries", icon: <IconBooks className="h-5 w-5 flex-shrink-0" /> },
          { label: "Mess", href: "/dashboard/mess", icon: <IconBuildingStore className="h-5 w-5 flex-shrink-0" /> },
          { label: "Colleges", href: "/dashboard/colleges", icon: <IconSchool className="h-5 w-5 flex-shrink-0" /> },
          { label: "Hostels", href: "/dashboard/hostels", icon: <IconBed className="h-5 w-5 flex-shrink-0" /> },
        ],
        traveller: [
          { label: "Hotels", href: "/dashboard/hotels", icon: <IconBuildingCottage className="h-5 w-5 flex-shrink-0" /> },
          { label: "Attractions", href: "/dashboard/attractions", icon: <IconMapPin className="h-5 w-5 flex-shrink-0" /> },
          { label: "Restaurants", href: "/dashboard/restaurants", icon: <IconBuildingStore className="h-5 w-5 flex-shrink-0" /> },
        ],
        businessman: [
          { label: "Co-working Spaces", href: "/dashboard/coworking", icon: <IconBuildingSkyscraper className="h-5 w-5 flex-shrink-0" /> },
          { label: "Business Centers", href: "/dashboard/business-centers", icon: <IconBuildingCommunity className="h-5 w-5 flex-shrink-0" /> },
          { label: "Networking Events", href: "/dashboard/networking", icon: <IconUsers className="h-5 w-5 flex-shrink-0" /> },
        ],
      };
    
      return [...(roleSpecificLinks[role] || []), ...commonLinks];
    };
  
    const links = getLinksForRole(session?.user?.role || 'student');
  
    return (
      <div className="flex h-screen">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: session?.user?.name || "User",
                  href: "/dashboard/profile",
                  icon: (
                    <div className="h-7 w-7 rounded-full bg-gray-300 flex items-center justify-center">
                      {session?.user?.name?.[0] || "U"}
                    </div>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    );
  }
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
