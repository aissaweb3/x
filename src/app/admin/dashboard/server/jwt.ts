"use server";

import { sign, verify } from "jsonwebtoken";

export default async function generateJWT(expiresIn: string, token: string) {
  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  if (id !== process.env.ADMIN_ID) return "Only Admin Can Add Tasks";

  if (expiresIn === "0") return sign({ verification: true }, process.env.JWT_SECRET as string);

  return sign({ verification: true }, process.env.JWT_SECRET as string, {
    expiresIn: parseInt(expiresIn) + "h",
  });
}
