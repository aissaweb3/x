import { getServerSession } from "next-auth";
import { authOptions } from "@/../lib/authOptions";
import { sign } from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function getTokenOrBack({
  admin = false,
}: {
  admin: boolean;
}) {
  const session: any = await getServerSession(authOptions);
  const id = session?.user?.id as string;
  if (!id && admin) return redirect("/api/auth/signin");
  if (!id) return redirect("/");
  //
  if (id === process.env.ADMIN_ID && !admin)
    return redirect("/admin/dashboard");
  if (admin && id !== process.env.ADMIN_ID) return redirect("/user/dashboard");
  //
  const token = sign({ id }, process.env.JWT_SECRET as string);
  return { token, id, user: session.user };
}
