"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";

export default function TopBar() {
  const pathname = usePathname();
  const { clients, selectedClient, selectClient } = useClients();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hideDropdown = pathname === "/clients/new";

  return (
    <header className="fixed top-0 left-56 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-end gap-4 px-6 z-10">
      {!hideDropdown && (
        <>
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              {selectedClient ? selectedClient.fullName : "Clients"}
              <svg
                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                <div className="max-h-48 overflow-y-auto">
                  {clients.length === 0 ? (
                    <span className="block px-4 py-2 text-sm text-gray-400">
                      No clients yet
                    </span>
                  ) : (
                    clients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => {
                          selectClient(client.id);
                          setOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          selectedClient?.id === client.id
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {client.fullName}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <Link
            href="/clients/new"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            + create new client
          </Link>
        </>
      )}
    </header>
  );
}
