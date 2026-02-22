"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useClients } from "@/app/context/ClientsContext";
import { Button } from "@/app/components/ui/button";

export default function TakedownDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedClient } = useClients();

  const takedown = selectedClient?.takedowns.find((t) => t.id === id);

  if (!takedown) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Takedown Details</h1>
        <p className="text-sm text-gray-400">Takedown not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/takedowns">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Takedown Details</h1>
      <p className="text-sm text-gray-500 font-mono">{takedown.id}</p>
    </div>
  );
}
