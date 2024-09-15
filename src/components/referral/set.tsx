"use client";
import { setInLocalStorage } from "@/utils/client/localstorage/manage";
import { useSession } from "next-auth/react";

export default function Referral({ id }: { id: any }) {
  return <Sessioned id={id} />;
}

function Sessioned({ id }: { id: any }) {
  if (!id) return null;

  setInLocalStorage("referral", id);
  return null;
}
