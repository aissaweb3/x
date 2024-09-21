import getTokenOrBack from "@/utils/server/getTokenOrBack";
import React from "react";
import { Client } from "./client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: any;
}) {
  if (searchParams.refresh === "true")
    redirect("/user/profile")
  const { token, user, dbUser, id } = await getTokenOrBack({ admin: false });
  if (!dbUser) redirect("/")
  

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: "url('/images/media/room (4).jpg')",
      }}
    >
      <div className="relative" style={{ zIndex: "2" }}>
        <Header showGhosts />
      </div>
      <Client user={dbUser as User} token={token} />
      
    </div>
  );
}
