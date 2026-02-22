"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useClients } from "@/app/context/ClientsContext";

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
      <Link
        href="/takedowns"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Takedown Details</h1>
      <p className="text-sm text-gray-500 font-mono">{takedown.id}</p>
    </div>
  );
}
