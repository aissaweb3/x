import getTokenOrBack from "@/utils/server/getTokenOrBack";
import db from "@/lib/db";
import { Verify } from "./verify";
import { TaskStatus } from "@prisma/client";

type PendingTasksPro = (TaskStatus & {
  platform: string;
  username: string;
  type: "img" | "link";
});

export default async function AdminDashboard() {
  const { token } = await getTokenOrBack({ admin: true });
  let pendingTasks = await db.taskStatus.findMany({
    where: {
      status: "PENDING",
      screenShot: { not: { equals: null } },
    },
  });

  const pendingTasksPro = await Promise.all(pendingTasks.map(async (pendingTask) => {
    const { userId, taskId } = pendingTask;
    const user = await db.user.findUnique({ where: { id: userId } });
    const task = await db.task.findUnique({ where: { id: taskId } });

    let username = '';
    if (task?.platform === "TWITTER") {
      username = user?.twitterName ?? '';
    } else if (task?.platform === "DISCORD") {
      username = user?.discordName ?? '';
    } else if (task?.platform === "YOUTUBE") {
      username = user?.email ?? '';
    }

    const type = task?.taskVerificationType === "SCREEN_SHOT" ? "img" : "link";
    const platform = task?.platform as string

    return {
      ...pendingTask,
      platform,
      username,
      type,
    } as PendingTasksPro;
  }));

  return (
    <div
      style={{ fontFamily: "auto" }}
      className="light flex flex-col min-h-screen bg-muted/40"
    >
      <main className="flex-1 p-4 sm:p-6">
        <Verify token={token as string} pendingTasks={pendingTasksPro} />
      </main>
    </div>
  );
}
