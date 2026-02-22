"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Client, Takedown } from "@/app/types/client";

type ClientsContextValue = {
  clients: Client[];
  selectedClient: Client | null;
  selectClient: (id: string) => void;
  addClient: (client: Omit<Client, "id" | "takedowns">) => Client;
  addTakedown: (data: Pick<Takedown, "contentUrl" | "notes">) => Takedown | null;
  getClient: (id: string) => Client | undefined;
};

const ClientsContext = createContext<ClientsContextValue | null>(null);

export function ClientsProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const selectedClient = clients.find((c) => c.id === selectedClientId) ?? null;

  function addClient(data: Omit<Client, "id" | "takedowns">): Client {
    const newClient: Client = {
      ...data,
      id: crypto.randomUUID(),
      takedowns: [],
    };
    setClients((prev) => [...prev, newClient]);
    setSelectedClientId(newClient.id);
    return newClient;
  }

  function addTakedown(data: Pick<Takedown, "contentUrl" | "notes">): Takedown | null {
    if (!selectedClientId) return null;
    const now = new Date();
    const newTakedown: Takedown = {
      id: crypto.randomUUID(),
      contentUrl: data.contentUrl,
      ...(data.notes ? { notes: data.notes } : {}),
      createdAt: now,
      updatedAt: now,
      status: "pending",
    };
    setClients((prev) =>
      prev.map((c) =>
        c.id === selectedClientId
          ? { ...c, takedowns: [...c.takedowns, newTakedown] }
          : c
      )
    );
    return newTakedown;
  }

  function selectClient(id: string) {
    setSelectedClientId(id);
  }

  function getClient(id: string) {
    return clients.find((c) => c.id === id);
  }

  return (
    <ClientsContext.Provider value={{ clients, selectedClient, selectClient, addClient, addTakedown, getClient }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const ctx = useContext(ClientsContext);
  if (!ctx) {
    throw new Error("useClients must be used within a ClientsProvider");
  }
  return ctx;
}
