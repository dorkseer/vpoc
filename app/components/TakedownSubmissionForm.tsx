"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";
import { Card, CardContent } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";

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
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Select a client first to submit a takedown.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contentUrl">Content URL</Label>
            <Input
              id="contentUrl"
              type="text"
              required
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
              placeholder="https://example.com/content"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="additionalNotes">
              Additional notes
              <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="additionalNotes"
              rows={4}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any additional context or details..."
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit">Submit takedown</Button>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}
