"use server"

import db from "@/lib/db";
import { verify } from "jsonwebtoken";

export const changeEmail = async (token: string, email: string)=>{
    const decoded: any = verify(token, process.env.JWT_SECRET as string);
    const { id } = decoded;
    const user = await db.user.findUnique({ where: { id } });
    if (!user) return { success: false, error: "Re-Signin and try Again !" };
    // go ahead
    try {
        await db.user.update({where: {id}, data: {email}})
        return { success: true, error: "" };
    } catch (error: any) {
        console.log(error);
        return { success: false, error: "Server Error !!" };
    }
}

