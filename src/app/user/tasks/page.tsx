import getTokenOrBack from "@/utils/server/getTokenOrBack";
import db from "@/lib/db";
import { Task, TaskStatus } from "@prisma/client";
import Client from "./client";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
        status: userTaskStatus?.status || "NONE",
      };
    })
  );

  return (
    <>
      <div
        style={{
          backgroundSize: "cover",
          backgroundImage: "url('/images/media/room (7).jpg')",
        }}
      >
        <div className="relative" style={{ zIndex: "2" }}>
          <Header showGhosts />
        </div>
        <Client tasksSTR={JSON.stringify(tasksPro)} token={token} />
        <Footer />
      </div>
    </>
  );
}
