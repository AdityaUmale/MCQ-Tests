"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconSettings,
  IconUserCircle,
  IconLogout,
  IconBuildingCommunity,
  IconBooks,
  IconBuildingStore,
  IconSchool,
  IconBed,
  IconMapPin,
  IconBuildingSkyscraper,
  IconUsers,
  IconBuildingCottage,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

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
      Student: [
        { label: "Study Centers", href: "/dashboard/study-centers", icon: <IconBuildingCommunity className="h-5 w-5 flex-shrink-0" /> },
        { label: "Libraries", href: "/dashboard/libraries", icon: <IconBooks className="h-5 w-5 flex-shrink-0" /> },
        { label: "Mess", href: "/dashboard/mess", icon: <IconBuildingStore className="h-5 w-5 flex-shrink-0" /> },
        { label: "Colleges", href: "/dashboard/colleges", icon: <IconSchool className="h-5 w-5 flex-shrink-0" /> },
        { label: "Hostels", href: "/dashboard/hostels", icon: <IconBed className="h-5 w-5 flex-shrink-0" /> },
      ],
      Traveller: [
        { label: "Hotels", href: "/dashboard/hotels", icon: <IconBuildingCottage className="h-5 w-5 flex-shrink-0" /> },
        { label: "Attractions", href: "/dashboard/attractions", icon: <IconMapPin className="h-5 w-5 flex-shrink-0" /> },
        { label: "Restaurants", href: "/dashboard/restaurants", icon: <IconBuildingStore className="h-5 w-5 flex-shrink-0" /> },
      ],
      Businessman: [
        { label: "Co-working Spaces", href: "/dashboard/coworking", icon: <IconBuildingSkyscraper className="h-5 w-5 flex-shrink-0" /> },
        { label: "Business Centers", href: "/dashboard/business-centers", icon: <IconBuildingCommunity className="h-5 w-5 flex-shrink-0" /> },
        { label: "Networking Events", href: "/dashboard/networking", icon: <IconUsers className="h-5 w-5 flex-shrink-0" /> },
      ],
    };

    return [...(roleSpecificLinks[role] || []), ...commonLinks];
  };

  // Loading state if the session is still being fetched
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log("Session Data:", session);
  console.log("Role:", session?.user?.role);

  const role = session?.user?.role || "Student"; // Default to 'student' if no role is found
  const links = getLinksForRole(role);

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

// Logo and LogoIcon Components
export const Logo = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-pre">
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
