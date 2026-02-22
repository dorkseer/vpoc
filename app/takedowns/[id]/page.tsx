"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useClients } from "@/app/context/ClientsContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";

export default function TakedownDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedClient } = useClients();

  const takedown = selectedClient?.takedowns.find((t) => t.id === id);

  if (!takedown) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-6">Takedown Details</h1>
        <p className="text-sm text-muted-foreground">Takedown not found.</p>
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
      <h1 className="text-2xl font-semibold text-foreground mb-6">Takedown Details</h1>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Takedown Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8">
              <dl className="flex flex-col gap-4">
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Created At</dt>
                  <dd className="mt-0.5 text-sm">{takedown.createdAt.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Updated At</dt>
                  <dd className="mt-0.5 text-sm">{takedown.updatedAt.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Content URL</dt>
                  <dd className="mt-0.5 text-sm break-all">
                    <a href={takedown.contentUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">{takedown.contentUrl}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Additional Notes</dt>
                  <dd className="mt-0.5 text-sm">{takedown.notes ?? "n/a"}</dd>
                </div>
              </dl>
              <dl className="flex flex-col gap-4">
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Takedown Drafted Date</dt>
                  <dd className="mt-0.5 text-sm">{takedown.complianceDetails?.draftedAt?.toLocaleString() ?? "n/a"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Takedown Sent Date</dt>
                  <dd className="mt-0.5 text-sm">{takedown.complianceDetails?.sentAt?.toLocaleString() ?? "n/a"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Last Compliance Verified</dt>
                  <dd className="mt-0.5 text-sm">{takedown.complianceDetails?.compliedAt?.toLocaleString() ?? "n/a"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Compliance Status</dt>
                  <dd className="mt-0.5 text-sm">{takedown.complianceDetails?.complianceStatus ?? "n/a"}</dd>
                </div>
              </dl>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Takedown Activity History</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {takedown.history.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Takedown Terms Requirement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Takedown Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-md p-6 bg-muted text-foreground text-sm leading-relaxed space-y-4 font-serif">
              <div className="text-right text-muted-foreground">
                <p>Date: {takedown.createdAt.toLocaleDateString()}</p>
                <p>Reference No: {takedown.id.slice(0, 8).toUpperCase()}</p>
              </div>

              <div>
                <p className="font-semibold">DMCA Takedown Notice</p>
                <p className="text-muted-foreground">Pursuant to 17 U.S.C. &sect; 512(c)</p>
              </div>

              <hr />

              <div className="space-y-1">
                <p><span className="font-semibold">To:</span> Content Host / Service Provider</p>
                <p><span className="font-semibold">From:</span> {selectedClient?.fullName ?? "Rights Holder"}{selectedClient?.managementCompany ? `, c/o ${selectedClient.managementCompany}` : ""}</p>
                <p><span className="font-semibold">Re:</span> Notification of Copyright Infringement</p>
              </div>

              <hr />

              <p>Dear Sir/Madam,</p>

              <p>
                I am writing to notify you, pursuant to the Digital Millennium Copyright Act
                (&ldquo;DMCA&rdquo;), 17 U.S.C. &sect; 512(c), that content hosted on your platform
                infringes upon copyrights owned by the undersigned party. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </p>

              <div className="space-y-1">
                <p className="font-semibold">Infringing Material:</p>
                <p className="break-all text-primary underline">{takedown.contentUrl}</p>
              </div>

              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. The above-referenced material is not authorized by the copyright owner,
                its agent, or the law. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>

              <div className="space-y-1">
                <p className="font-semibold">Action Requested:</p>
                <p>
                  I hereby demand that you immediately remove or disable access to the infringing material
                  identified above. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold">Good Faith Statement:</p>
                <p>
                  I have a good faith belief that use of the material in the manner complained of is not
                  authorized by the copyright owner, its agent, or the law. The information in this
                  notification is accurate, and under penalty of perjury, I am authorized to act on behalf
                  of the owner of an exclusive right that is allegedly infringed.
                </p>
              </div>

              <hr />

              <div className="space-y-1">
                <p>Sincerely,</p>
                <p className="font-semibold italic">{selectedClient?.fullName ?? "Rights Holder"}</p>
                {selectedClient?.email && (
                  <p className="text-muted-foreground">{selectedClient.email}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
