"use server";

import db from "@/lib/db";
import { verify } from "jsonwebtoken";

export async function VerifyTask({
  pendingTaskId,
  token,
}: {
  pendingTaskId: string;
  token: string;
}) {
  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  if (id !== process.env.ADMIN_ID)
    return { success: false, error: "Only Admin Can Verify Tasks" };

  try {
    const pt = await db.taskStatus.findUnique({ where: { id: pendingTaskId } });
    if (!pt) return { success: false, error: "Pending Task Not Found !!" };

    await db.$transaction(async (db) => {
      const t1 = await db.taskStatus.update({
        where: { id: pendingTaskId },
        data: { status: "COMPLETED" },
      });
      const t2 = await db.user.update({
        where: { id: pt.userId },
        data: { xp: { increment: pt.xp } },
      });
      return [t1, t2];
    });

    return { success: true, error: "" };
  } catch (error) {
    console.log(error);

    return { success: false, error: "Server Error !" };
  }
}

export async function DeleteTask({
  pendingTaskId,
  token,
}: {
  pendingTaskId: string;
  token: string;
}) {
  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  if (id !== process.env.ADMIN_ID)
    return { success: false, error: "Only Admin Can Delete Tasks" };

  try {
    const pt = await db.taskStatus.findUnique({ where: { id: pendingTaskId } });
    if (!pt) return { success: false, error: "Task already Deleted !!" };

    await db.taskStatus.delete({
      where: { id: pendingTaskId },
    });

    return { success: true, error: "" };
  } catch (error) {
    console.log(error);

    return { success: false, error: "Server Error !" };
  }
}
