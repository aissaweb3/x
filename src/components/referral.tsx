"use client";

import {
  getFromLocalStorage,
  setInLocalStorage,
} from "@/utils/client/localstorage/manage";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ManageReferral({ token, id }: { token: string, id: string }) {
  const referralToken = getFromLocalStorage("referral") as string;

  if (!referralToken || !id) return null;

  return <Client token={token} referralToken={referralToken} />;
  return (
    <SessionProvider>
      <Client token={token} referralToken={referralToken} />
    </SessionProvider>
  );
}

function Client({
  token,
  referralToken,
}: {
  token: string;
  referralToken: any;
}) {
  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const response = await fetch("/api/createReferral", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, referralToken }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.success) setInLocalStorage("referral", "");
      } catch (error) {
        console.error("Error:", error);
      }
    };
    sendPostRequest();
  });
  return null;
}
