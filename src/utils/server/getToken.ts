import { getServerSession } from "next-auth";
import { authOptions } from "@/../lib/authOptions";
import { sign } from "jsonwebtoken";

export default async function getToken() {
  const session: any = await getServerSession(authOptions);
  const id = session?.user?.id as string;
  const provider = session?.user?.provider as string;
  const token = sign({ id }, process.env.JWT_SECRET as string);
  return { token, id, provider };
}
