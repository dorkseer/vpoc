"use client";

import { useRouter } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";
import ClientForm from "@/app/components/ClientForm";
import { Client } from "@/app/types/client";

export default function NewClientPage() {
  const router = useRouter();
  const { addClient } = useClients();

  function handleSubmit(data: Omit<Client, "id" | "takedowns">) {
    addClient(data);
    router.push("/alerts");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Create New Client</h1>
      <ClientForm submitLabel="Create client" onSubmit={handleSubmit} />
    </div>
  );
}
