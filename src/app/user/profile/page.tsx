import getTokenOrBack from "@/utils/server/getTokenOrBack";
import React from "react";
import { Client } from "./client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { User } from "@prisma/client";

export default async function page() {
  const { token, user, id } = await getTokenOrBack({ admin: false });

  return (
    <div style={{ background: "url('/images/media/bg1.jpg')" }}>
      <Header />
      <Client user={user as User} />
      <Footer />
    </div>
  );
}
