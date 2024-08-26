import getTokenOrBack from "@/utils/server/getTokenOrBack";
import db from "@/lib/db";
import { Task, TaskStatus } from "@prisma/client";
import Client from "./client";

export default async function server() {
  const { token, user, id } = await getTokenOrBack({ admin: false });

  const tasks: Task[] = await db.task.findMany({
    orderBy: { createdAt: "desc" },
    where: { active: true },
  });

  const tasksPro: any = await Promise.all(
    tasks.map(async (task) => {
      const userTaskStatus = await db.taskStatus.findFirst({
        where: { userId: id as string, taskId: task.id },
      });

      return {
        ...task,
        userStatus: userTaskStatus?.status || "NONE",
      };
    })
  );

  return <Client tasksSTR={JSON.stringify(tasksPro)} />;
}
