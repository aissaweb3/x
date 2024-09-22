"use server";
import db from "@/lib/db";
import { Platform, TaskType, TaskVerificationType } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";

type Data = {
  title: string;
  description: string;
  link: string;
  platform: Platform;
  taskType: TaskType;
  xp: number;
  token: string;
  daily: boolean;
  taskVerificationType: TaskVerificationType;
  channelId: string;
};

export const addTask = async (data: Data) => {
  const {
    platform,
    taskType,
    xp,
    token,
    description,
    link,
    title,
    daily,
    taskVerificationType,
    channelId,
  } = data;

  const decoded: any = verify(token, process.env.JWT_SECRET as string);
  const { id } = decoded;
  if (id !== process.env.ADMIN_ID)
    return { success: false, error: "Only Admin Can Add Tasks", taskToken: "" };

  // continue
  try {
    const created = await db.task.create({
      data: {
        title,
        description,
        link,
        platform,
        taskType,
        xp,
        daily,
        taskVerificationType,
        channelId
      },
    });
    let taskToken = ""
    if (taskVerificationType === "JWT_CODE") taskToken = sign({ taskId: created.id, verification: true }, process.env.JWT_SECRET as string)
    return { success: created, error: "", taskToken };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Server Error or Connection Issue !", taskToken: "" };
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
