"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";

export default function NewClientPage() {
  const router = useRouter();
  const { addClient } = useClients();

  const [fullName, setFullName] = useState("");
  const [publicName, setPublicName] = useState("");
  const [email, setEmail] = useState("");
  const [managementCompany, setManagementCompany] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addClient({
      fullName,
      publicName,
      email,
      ...(managementCompany ? { managementCompany } : {}),
    });

    router.push("/alerts");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create New Client</h1>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Jane Doe"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="publicName" className="text-sm font-medium text-gray-700">
              Public name
            </label>
            <input
              id="publicName"
              type="text"
              required
              value={publicName}
              onChange={(e) => setPublicName(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="J. Doe"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="jane@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="managementCompany" className="text-sm font-medium text-gray-700">
              Rights management company
              <span className="ml-1 font-normal text-gray-400">(optional)</span>
            </label>
            <input
              id="managementCompany"
              type="text"
              value={managementCompany}
              onChange={(e) => setManagementCompany(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Acme Rights Ltd."
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Create client
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
