"use client";

import { useRouter } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { TakedownStatus } from "@/app/types/takedown";

const STATUS_BADGE_CONFIG: Record<TakedownStatus, { label: string; variant: "secondary" | "outline" | "default" | "destructive" }> = {
  drafting: { label: "Drafting", variant: "secondary" },
  pending_review: { label: "Pending Review", variant: "outline" },
  notice_sent: { label: "Notice Sent", variant: "default" },
  notice_denied: { label: "Notice Denied", variant: "destructive" },
};

export default function TakedownsPage() {
  const router = useRouter();
  const { selectedClient } = useClients();

  if (!selectedClient) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-6">Takedowns</h1>
        <p className="text-sm text-muted-foreground">Select a client to view takedowns.</p>
      </div>
    );
  }

  const takedowns = selectedClient.takedowns;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Takedowns</h1>

      {takedowns.length === 0 ? (
        <p className="text-sm text-muted-foreground">No takedowns for this client.</p>
      ) : (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {takedowns.map((takedown) => (
                <TableRow
                  key={takedown.id}
                  onClick={() => router.push(`/takedowns/${takedown.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-mono text-xs">{takedown.id}</TableCell>
                  <TableCell>{takedown.updatedAt.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_BADGE_CONFIG[takedown.status].variant}>
                      {STATUS_BADGE_CONFIG[takedown.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{takedown.createdAt.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
