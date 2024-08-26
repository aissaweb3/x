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
  if (!user) return { success: false, error: "Not Authorised !" };

    return { success: true, error: "" };
    // continue
    /*
  try {
    db.$transaction(async (db) => {
      const t1 = await db.user.update({
        where: { id },
        data: {
          pendingTasks: {
            connect: { id: taskId },
          },
        },
      });
      const t2 = await db.task.update({
        where: { id: taskId },
        data: {
          pendingUsers: {
            connect: { id },
          },
        },
      });
      return [t1, t2];
    });
    return { success: true, error: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error Or Connection Error" };
  }*/
};
