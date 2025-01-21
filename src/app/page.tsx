"use client"
import { useSession } from "next-auth/react";
import Home from "./Home";
import { ComingSoon } from "@/components/comingSoon";

export default function Page() {
  const { status, data } = useSession();
  if (status === "loading") return null;
  if (status === "unauthenticated") return <Home />
  return <ComingSoon userEmail={data?.user?.email ?? ""} />
}
