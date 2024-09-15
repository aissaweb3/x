import { sign } from "jsonwebtoken";
import Client from "./client";
import Referral from "@/components/referral/set";

export default async function Component({
  searchParams,
}: {
  searchParams: any;
}) {
  const { referral } = searchParams;
  const referralId = sign({ referral }, process.env.JWT_SECRET as string, {
    expiresIn: "10m",
  });

  return (
    <>
      <Client />
      <Referral id={referralId} />
    </>
  );
}
