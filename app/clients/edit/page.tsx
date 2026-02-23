"use client";

import { useRouter } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";
import ClientForm from "@/app/components/ClientForm";
import { Client } from "@/app/types/client";

export default function EditClientPage() {
  const router = useRouter();
  const { selectedClient, updateClient } = useClients();

  if (!selectedClient) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Edit Client Details</h1>
        <p className="text-sm text-muted-foreground">Select a client first.</p>
      </div>
    );
  }

  function handleSubmit(data: Omit<Client, "id" | "takedowns">) {
    updateClient(selectedClient!.id, data);
    router.push("/alerts");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Edit Client Details</h1>
      <ClientForm
        initialData={selectedClient}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
