"use client";
import {
  getFromLocalStorage,
  setInLocalStorage,
} from "@/utils/client/localstorage/manage";
import { SessionProvider, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Referral({ id }: { id: any }) {
  return (
    <SessionProvider>
      <Sessioned id={id} />
    </SessionProvider>
  );
}

function Sessioned({ id }: { id: any }) {
  if (!id) return null;

  const { data } = useSession();
  if ( !data?.user )
    setInLocalStorage("referral", id);
  if (getFromLocalStorage("referral") === (id as string))
    redirect("/");
  return null;
}
