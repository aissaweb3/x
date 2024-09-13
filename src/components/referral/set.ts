"use client"
import { setInLocalStorage } from "@/utils/client/localstorage/manage";

export default function Referral({ id }: { id: any }) {
  setInLocalStorage("referral", id);
  return null;
}
