"use server";
import db from "@/lib/db";
import { User } from "@prisma/client";
import { verify } from "jsonwebtoken";

type Data = {
  taskId: string;
  token: string;
  img: string;
  JWT_CODE: string | undefined;
  vLink: string | undefined;
};

export const completeTaskServer = async (data: Data) => {
  const { taskId, token, img, JWT_CODE, vLink } = data;

  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return { success: false, error: "Re-Signin and try Again !" };
  const task = await db.task.findUnique({ where: { id: taskId } });
  if (!task) return { success: false, error: "Task Doesn't exist !" };

  if (task.taskVerificationType === "JWT_CODE") {
    console.log(JWT_CODE);
    
    if (!JWT_CODE)
      return { success: false, error: "KEY is Required!" };
    const decodedCode: any = verify(JWT_CODE, process.env.JWT_SECRET as string);

    const { verification, taskId: decodedTaskId } = decodedCode;
    if (verification === true && taskId === decodedTaskId) {
      const alreadydid = await db.taskStatus.findFirst({
        where: { userId: id, taskId },
      });
      // update
      if (alreadydid) {
        await db.$transaction(async (db) => {
          const t1 = await db.taskStatus.update({
            where: { id: alreadydid.id },
            data: { status: "COMPLETED" },
          });
          const t2 = await db.user.update({
            where: { id },
            data: { xp: { increment: task.xp } },
          });
          return [t1, t2];
        });
        return { success: true, error: "" };
      }
      // create
      await db.$transaction(async (db) => {
        const t1 = await db.taskStatus.create({
          data: {
            userId: id,
            taskId,
            status: "COMPLETED",
            xp: task.xp,
            screenShot: img,
          },
        });
        const t2 = await db.user.update({
          where: { id },
          data: { xp: { increment: task.xp } },
        });
        return [t1, t2];
      });
      return { success: true, error: "" };
    } else {
      return { success: false, error: "KEY is not Valid or Expired !!" };
    }
  }

  // continue
  try {
    const alreadydid = await db.taskStatus.findFirst({
      where: { userId: id, taskId },
    });
    if (alreadydid)
      return { success: false, error: "Task Already Submitted !" };
    await db.taskStatus.create({
      data: {
        userId: id,
        taskId,
        status: "PENDING",
        xp: task.xp,
        screenShot: img,
        verificationLink: vLink
      },
    });
    return { success: true, error: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error Or Connection Error" };
  }
};
