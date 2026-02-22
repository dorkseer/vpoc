"use client";

import { useRouter } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";

export default function TakedownsPage() {
  const router = useRouter();
  const { selectedClient } = useClients();

  if (!selectedClient) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Takedowns</h1>
        <p className="text-sm text-gray-400">Select a client to view takedowns.</p>
      </div>
    );
  }

  const takedowns = selectedClient.takedowns;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Takedowns</h1>

      {takedowns.length === 0 ? (
        <p className="text-sm text-gray-400">No takedowns for this client.</p>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700">ID</th>
                <th className="px-4 py-3 font-medium text-gray-700">Updated At</th>
                <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 font-medium text-gray-700">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {takedowns.map((takedown) => (
                <tr
                  key={takedown.id}
                  onClick={() => router.push(`/takedowns/${takedown.id}`)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 text-gray-900 font-mono text-xs">{takedown.id}</td>
                  <td className="px-4 py-3 text-gray-600">{takedown.updatedAt.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      {takedown.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{takedown.createdAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
