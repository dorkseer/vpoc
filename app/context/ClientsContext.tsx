"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Client } from "@/app/types/client";
import { Takedown, TakedownStatus } from "@/app/types/takedown";
import { withTimestamp } from "@/lib/utils";

type ClientsContextValue = {
  clients: Client[];
  selectedClient: Client | null;
  selectClient: (id: string) => void;
  addClient: (client: Omit<Client, "id" | "takedowns">) => Client;
  addTakedown: (data: Pick<Takedown, "contentUrl" | "notes">) => Takedown | null;
  updateClient: (id: string, data: Omit<Client, "id" | "takedowns">) => void;
  getClient: (id: string) => Client | undefined;
  updateTakedownStatus: (takedownId: string, newStatus: TakedownStatus) => void;
};

const ClientsContext = createContext<ClientsContextValue | null>(null);

const DUMMY_CLIENT_ID = "c1a2b3c4-d5e6-7f89-0abc-def123456789";

const DUMMY_CLIENTS: Client[] = [
  {
    id: DUMMY_CLIENT_ID,
    fullName: "Jane Doe",
    publicName: "J. Doe",
    email: "jane.doe@example.com",
    managementCompany: "Acme Rights Ltd.",
    takedowns: [
      {
        id: "td-001a2b3c-4d5e-6f78-9abc-def012345678",
        contentUrl: "https://example.com/infringing-video-1",
        notes: "Unauthorized re-upload of original music video.",
        createdAt: new Date("2026-01-15T10:30:00"),
        updatedAt: new Date("2026-02-10T14:22:00"),
        status: "pending_review",
        createdBy: "Admin",
        history: [
          "Takedown created by System at 1/15/2026, 10:30:00 AM",
          "Takedown notice drafted at 1/16/2026, 9:00:00 AM",
        ],
        complianceDetails: {
          draftedAt: new Date("2026-01-16T09:00:00"),
        },
      },
      {
        id: "td-002b3c4d-5e6f-7890-abcd-ef0123456789",
        contentUrl: "https://example.com/pirated-content-2",
        createdAt: new Date("2026-02-05T08:45:00"),
        updatedAt: new Date("2026-02-18T16:05:00"),
        status: "notice_sent",
        createdBy: "Admin",
        history: [
          "Takedown created by System at 2/5/2026, 8:45:00 AM",
          "Takedown notice drafted at 2/6/2026, 10:00:00 AM",
          "Takedown notice approved by Admin at 2/7/2026, 2:30:00 PM",
        ],
        complianceDetails: {
          draftedAt: new Date("2026-02-06T10:00:00"),
          sentAt: new Date("2026-02-07T14:30:00"),
          compliedAt: new Date("2026-02-18T16:05:00"),
          complianceStatus: "Content removed",
        },
      },
    ],
  },
];

const STATUS_HISTORY_MESSAGES: Record<string, string> = {
  pending_review: "Takedown notice drafted",
  notice_sent: "Takedown notice approved by Admin",
  notice_denied: "Takedown notice denied by Admin",
};

export function ClientsProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(DUMMY_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(DUMMY_CLIENT_ID);

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
      status: "drafting",
      createdBy: "Admin",
      history: [withTimestamp("Takedown created by System")],
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

  function updateTakedownStatus(takedownId: string, newStatus: TakedownStatus) {
    const now = new Date();
    setClients((prev) =>
      prev.map((client) => ({
        ...client,
        takedowns: client.takedowns.map((t) => {
          if (t.id !== takedownId) return t;
          const historyMessage = STATUS_HISTORY_MESSAGES[newStatus];
          const updatedCompliance = { ...t.complianceDetails };
          if (newStatus === "pending_review") {
            updatedCompliance.draftedAt = now;
          } else if (newStatus === "notice_sent") {
            updatedCompliance.sentAt = now;
          }
          return {
            ...t,
            status: newStatus,
            updatedAt: now,
            history: historyMessage
              ? [...t.history, withTimestamp(historyMessage)]
              : t.history,
            complianceDetails: updatedCompliance,
          };
        }),
      }))
    );
  }

  function updateClient(id: string, data: Omit<Client, "id" | "takedowns">) {
    setClients((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...data } : c
      )
    );
  }

  function selectClient(id: string) {
    setSelectedClientId(id);
  }

  function getClient(id: string) {
    return clients.find((c) => c.id === id);
  }

  return (
    <ClientsContext.Provider value={{ clients, selectedClient, selectClient, addClient, addTakedown, updateClient, getClient, updateTakedownStatus }}>
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
