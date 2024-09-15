"use client";

import {
  getFromLocalStorage,
  setInLocalStorage,
} from "@/utils/client/localstorage/manage";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ManageSession({ token, id }: { token: string, id: string }) {
  const oldUserToken = getFromLocalStorage("old") as string;

  if (!oldUserToken || !id) return null;

  return <Client newUserToken={token} oldUserToken={oldUserToken} />;
  return (
    <SessionProvider>
      <Client newUserToken={token} oldUserToken={oldUserToken} />
    </SessionProvider>
  );
}

function Client({
  newUserToken,
  oldUserToken,
}: {
  newUserToken: string;
  oldUserToken: any;
}) {
  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const response = await fetch("/api/linkAccounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newUserToken, oldUserToken }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.success) setInLocalStorage("old", "");
      } catch (error) {
        console.error("Error:", error);
      }
    };
    sendPostRequest();
  });
  return null;
}
