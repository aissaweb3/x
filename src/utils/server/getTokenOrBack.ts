import { getServerSession } from "next-auth";
import { authOptions } from "@/../lib/authOptions";
import { sign } from "jsonwebtoken";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export default async function getTokenOrBack({
  admin = false,
}: {
  admin: boolean;
}) {
  const session: any = await getServerSession(authOptions);
  const id = session?.user?.id as string;
  const provider = session?.user?.provider as string;
  if (!id && admin) return redirect("/api/auth/signin");
  if (!id) return redirect("/");
  //
  if (id === process.env.ADMIN_ID && !admin)
    return redirect("/admin/dashboard");
  if (admin && id !== process.env.ADMIN_ID) return redirect("/user/dashboard");
  //
  const token = sign({ id, provider }, process.env.JWT_SECRET as string);
  
  const dbUser = await db.user.findUnique({where: {id}});
  if (!dbUser) redirect("/")

  return { token, id, user: session.user, dbUser };
}
