import getTokenOrBack from "@/utils/server/getTokenOrBack";
import React from "react";
import { Client } from "./client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { User } from "@prisma/client";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

export default async function page() {
  const { token, user, id } = await getTokenOrBack({ admin: false });
  const dbUser = await db.user.findUnique({where: {id}});
  if (!dbUser) redirect("/")

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: "url('/images/media/bg1.jpg')",
      }}
    >
      <div className="relative" style={{ zIndex: "2" }}>
        <Header showGhosts />
      </div>
      <Client user={dbUser as User} token={token} />
      <Footer />
    </div>
  );
}
