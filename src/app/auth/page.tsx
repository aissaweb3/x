import { sign } from "jsonwebtoken";
import Client from "./client";
import Referral from "@/components/referral/set";
import Header from "@/components/header";
import getToken from "@/utils/server/getToken";
import Home from "../page";

export default async function Component({
  searchParams,
}: {
  searchParams: any;
}) {
  const { id } = await getToken();

  if (id) return <Home />;

  const { referral } = searchParams;
  const referralId = sign({ referral }, process.env.JWT_SECRET as string, {
    expiresIn: "5h",
  });

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: "url('/images/media/room (6).jpg')",
        minHeight: "100vh",
      }}
    >
      <div className="relative" style={{ zIndex: "2" }}>
        <Header showGhosts />
      </div>
      <Client />
      <Referral id={referralId} />
    </div>
  );
}
