"use client";

import {
  getFromLocalStorage,
  setInLocalStorage,
} from "@/utils/client/localstorage/manage";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManageSession({ token, id }: { token: string, id: string }) {
  const oldUserToken = getFromLocalStorage("old");

  // If there's no old user token or id, return null
  if (!oldUserToken || !id) return null;

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
  const router = useRouter();

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
        if (data.success) {
          setInLocalStorage("old", ""); // Clear the old token
          router.refresh(); 
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendPostRequest();
  }, [newUserToken, oldUserToken, router]); 

  return null; 
}
