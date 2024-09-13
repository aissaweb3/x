"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckIcon,
  ExternalLinkIcon,
  ImageIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { TaskStatus } from "@prisma/client";
import Image from "next/image";
import FormBtn from "@/components/simple/FormBtn";
import { DeleteTask, VerifyTask } from "./server/verify";

type PendingTasksPro = TaskStatus & {
  username: string;
  platform: string;
  type: "img" | "link";
};

export function Verify({
  token,
  pendingTasks,
}: {
  token: string;
  pendingTasks: PendingTasksPro[];
}) {
  const [tasks, setTasks] = useState(pendingTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleVerify = async (formData: FormData) => {
    const pendingTaskId = formData.get("taskId") as string;
    const result = await VerifyTask({ token, pendingTaskId });
    if (!result.success) return alert(result.error);
    setTasks(tasks.filter((task) => task.id !== pendingTaskId));
  };

  const handleDelete = async (formData: FormData) => {
    const pendingTaskId = formData.get("taskId") as string;
    const result = await DeleteTask({ token, pendingTaskId });
    if (!result.success) return alert(result.error);
    setTasks(tasks.filter((task) => task.id !== pendingTaskId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard - Task Verification
      </h1>
      <ScrollArea className="h-[calc(100vh-120px)]">
        {tasks.length === 0 && <div>No Pending Task.</div>}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card key={task.id} className="flex flex-col">
              <CardHeader>
                <p className="mb-2">
                  {task.platform.toLowerCase()} username :{" "}
                  <span className="text-[yellow]">{task.username}</span>
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedTask(task as any)}
                    >
                      {task.type === "img" ? (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          View Screenshot
                        </>
                      ) : (
                        <>
                          <ExternalLinkIcon className="mr-2 h-4 w-4" />
                          View Link
                        </>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0f1e2e] max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>
                        {task.type === "img"
                          ? "Screenshot"
                          : "Verification Link"}
                      </DialogTitle>
                    </DialogHeader>
                    {task.type === "img" ? (
                      <Image
                        src={`/images/uploads/${task.screenShot}`}
                        alt={`Task img`}
                        width="500"
                        height="500"
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="flex items-center justify-between bg-muted p-4 rounded-md">
                        <span className="text-sm font-medium">
                          {task.verificationLink}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(
                              task.verificationLink as string,
                              "_blank"
                            )
                          }
                        >
                          Open Link
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
              <CardFooter className="flex justify-between">
                <form action={handleVerify}>
                  <input type="hidden" value={task.id} name="taskId" />
                  <FormBtn variant="outline" size="sm">
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Verify
                  </FormBtn>
                </form>
                <form action={handleDelete}>
                  <input type="hidden" value={task.id} name="taskId" />
                  <FormBtn variant="outline" size="sm">
                    <Trash2Icon className="mr-2 h-4 w-4" />
                    Delete
                  </FormBtn>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
