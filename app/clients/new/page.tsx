"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClients } from "@/app/context/ClientsContext";
import { Card, CardContent } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

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
      <h1 className="text-2xl font-semibold text-foreground mb-6">Create New Client</h1>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="publicName">Public name</Label>
              <Input
                id="publicName"
                type="text"
                required
                value={publicName}
                onChange={(e) => setPublicName(e.target.value)}
                placeholder="J. Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="managementCompany">
                Rights management company
                <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="managementCompany"
                type="text"
                value={managementCompany}
                onChange={(e) => setManagementCompany(e.target.value)}
                placeholder="Acme Rights Ltd."
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit">Create client</Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
