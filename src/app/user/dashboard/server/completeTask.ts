"use server";
import db from "@/lib/db";
import { User } from "@prisma/client";
import { verify } from "jsonwebtoken";

type Data = {
  taskId: string;
  token: string;
};

export const completeTaskServer = async (data: Data) => {
  const { taskId, token } = data;

  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return { success: false, error: "Re-Signin and try Again !" };
  const task = await db.task.findUnique({ where: { id: taskId } });
  if (!task) return { success: false, error: "Task Doesn't exist !" };

  // continue
  try {
    const alreadydid = await db.taskStatus.findFirst({
      where: { userId: id, taskId },
    });
    if (alreadydid)
      return { success: false, error: "Task Already Submitted !" };
    await db.taskStatus.create({
      data: { userId: id, taskId, status: "PENDING", xp: task.xp },
    });
    return { success: true, error: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error Or Connection Error" };
  }
};
