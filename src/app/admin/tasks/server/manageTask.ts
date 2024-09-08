"use server";
import db from "@/lib/db";
import { Platform, TaskType, TaskVerificationType } from "@prisma/client";
import { verify } from "jsonwebtoken";

type Data = {
  title: string;
  description: string;
  link: string;
  platform: Platform;
  taskType: TaskType;
  xp: number;
  expiresAt: Date;
  token: string;
  daily: boolean;
  taskVerificationType: TaskVerificationType;
};

export const addTask = async (data: Data) => {
  const {
    platform,
    taskType,
    xp,
    expiresAt,
    token,
    description,
    link,
    title,
    daily,
    taskVerificationType
  } = data;

  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  if (id !== process.env.ADMIN_ID)
    return { success: false, error: "Only Admin Can Add Tasks" };

  // continue
  try {
    const created = await db.task.create({
      data: {
        title,
        description,
        link,
        expiresAt,
        platform,
        taskType,
        xp,
        daily,
        taskVerificationType
      },
    });
    return { success: created, error: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error or Connection Issue !" };
  }
};

type Data1 = {
  taskId: string;
  token: string;
};

export const deleteTask = async (data: Data1) => {
  const { taskId, token } = data;

  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  if (id !== process.env.ADMIN_ID)
    return { success: false, error: "Only Admin Can Add Tasks" };

  // continue
  try {
    await db.task.delete({
      where: { id: taskId },
    });
    return { success: true, error: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error or Connection Issue !" };
  }
};

type Data2 = {
  taskId: string;
  token: string;
  newState: boolean;
};
export const toggleStateTask = async (data: Data2) => {
  const { taskId, token, newState: active } = data;

  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  if (id !== process.env.ADMIN_ID)
    return { success: false, error: "Only Admin Can Add Tasks" };

  // continue
  try {
    await db.task.update({
      where: { id: taskId },
      data: { active },
    });
    return { success: true, error: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error or Connection Issue !" };
  }
};
