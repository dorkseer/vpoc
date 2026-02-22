"use client";

import { ClientsProvider } from "@/app/context/ClientsContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <ClientsProvider>{children}</ClientsProvider>;
}
