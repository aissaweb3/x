"use server";
import db from "@/lib/db";
import { verify } from "jsonwebtoken";

export default async function buyNFT({
  nftId,
  token,
}: {
  nftId: string;
  token: string;
}) {
  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return { success: false, error: "Re-Signin and try Again !" };
  const nft = await db.nFT.findUnique({ where: { id: nftId } });
  if (!nft) return { success: false, error: "NFT Doesn't exist !" };
  //
  if (user.xp < nft.xp)
    return { success: false, error: "Not Enough Secrets !" };

  // continue
  try {
    const alreadydid = await db.userNFT.findFirst({
      where: { userId: id, nftId },
    });
    if (alreadydid)
      return { success: false, error: "You Already Own the NFT !" };
    await buy(id, nftId, nft.xp);
    return { success: true, error: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error Or Connection Error" };
  }
}

const buy = async (id: string, nftId: string, price: number) => {
  await db.$transaction(async (db) => {
    const t1 = await db.userNFT.create({
      data: { userId: id, nftId },
    });
    const t2 = await db.user.update({
      where: { id },
      data: { xp: { decrement: price } },
    });
    return [t1, t2];
  });
};
