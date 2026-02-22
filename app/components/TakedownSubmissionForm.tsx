"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";

export default function TakedownSubmissionForm() {
  const router = useRouter();
  const { selectedClient, addTakedown } = useClients();
  const [contentUrl, setContentUrl] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedClient) return;

    addTakedown({
      contentUrl,
      ...(additionalNotes ? { notes: additionalNotes } : {}),
    });

    router.push("/takedowns");
  }

  if (!selectedClient) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <p className="text-sm text-gray-400">Select a client first to submit a takedown.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contentUrl" className="text-sm font-medium text-gray-700">
            Content URL
          </label>
          <input
            id="contentUrl"
            type="text"
            required
            value={contentUrl}
            onChange={(e) => setContentUrl(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="https://example.com/content"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700">
            Additional notes
            <span className="ml-1 font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id="additionalNotes"
            rows={4}
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
            placeholder="Any additional context or details..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit takedown
          </button>
        </div>

      </form>
    </div>
  );
}
