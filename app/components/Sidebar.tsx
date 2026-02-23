"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";

const navItems = [
  { label: "Alerts", href: "/alerts" },
  { label: "Takedowns", href: "/takedowns" },
  { label: "Submit New Takedown", href: "/takedowns/new" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { selectedClient } = useClients();

  const showEditClient = selectedClient && pathname !== "/clients/new";

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-sidebar flex flex-col">
      <div className="px-6 py-5 border-b border-sidebar-border">
        <span className="text-sidebar-foreground font-semibold text-lg">vpoc</span>
      </div>
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      {showEditClient && (
        <div className="p-3 border-t border-sidebar-border">
          <Link
            href="/clients/edit"
            className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              pathname === "/clients/edit"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            Edit Client Details
          </Link>
        </div>
      )}
    </aside>
  );
}
