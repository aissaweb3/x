"use server";
import db from "@/lib/db";
import { uploadFile } from "@/utils/server/upload";
import { verify } from "jsonwebtoken";

type Data = {
  img: string;
  name: string;
  xp: number;
  token: string;
};

export const addNFT = async (data: Data) => {
  const { img, name, xp, token } = data;

  //await uploadFile(img, "/images/nft")
  //return { success: true, error: "" };

  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  if (id !== process.env.ADMIN_ID)
    return { success: false, error: "Only Admin Can Add NFTs" };

  // continue
  try {
    const created = await db.nFT.create({
      data: {
        img,
        name,
        xp,
      },
    });
    return { success: created, error: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error or Connection Issue !" };
  }
};

type Data1 = {
  nftId: string;
  token: string;
};
export const deleteNFT = async (data: Data1) => {
  const { token, nftId } = data;

  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  if (id !== process.env.ADMIN_ID)
    return { success: false, error: "Only Admin Can Add NFTs" };

  // continue
  try {
    await db.nFT.delete({
      where: {
        id: nftId,
      },
    });
    return { success: true, error: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error or Connection Issue !" };
  }
};
