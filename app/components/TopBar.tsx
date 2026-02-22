"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useClients } from "@/app/context/ClientsContext";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";

export default function TopBar() {
  const pathname = usePathname();
  const { clients, selectedClient, selectClient } = useClients();

  const hideDropdown = pathname === "/clients/new";

  return (
    <header className="fixed top-0 left-56 right-0 h-14 bg-background border-b border-border flex items-center justify-end gap-4 px-6 z-10">
      {!hideDropdown && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                {selectedClient ? `${selectedClient.publicName} (${selectedClient.fullName})` : "Clients"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {clients.length === 0 ? (
                <span className="block px-2 py-1.5 text-sm text-muted-foreground">
                  No clients yet
                </span>
              ) : (
                clients.map((client) => (
                  <DropdownMenuItem
                    key={client.id}
                    onClick={() => selectClient(client.id)}
                    className={
                      selectedClient?.id === client.id ? "font-medium bg-accent" : ""
                    }
                  >
                    {client.publicName} ({client.fullName})
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="link" size="sm" asChild>
            <Link href="/clients/new">+ create new client</Link>
          </Button>
        </>
      )}
    </header>
  );
}
