"use client";

import { Badge } from "@/components/ui/badge";
import Modal from "@/components/simple/Modal";
import { useState } from "react";
import FormBtn from "@/components/simple/FormBtn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Platform, Task, TaskType, TaskVerificationType } from "@prisma/client";
import { addTask, deleteTask, toggleStateTask } from "./server/manageTask";
import formatDateSimple from "@/utils/simple/formatDateSimple";
import Link from "next/link";

export default function Add({
  token,
  tasks,
}: {
  token: string;
  tasks: string;
}) {
  const [addingTask, setAddingTask] = useState(false);
  const latestTasks: Task[] = JSON.parse(tasks);
  const [error, setError] = useState("");
  const [dTasks, setDTasks] = useState(latestTasks);

  const addTaskAction = async (e: FormData) => {
    const title = e.get("title") as string;
    const description = e.get("description") as string;
    const link = e.get("link") as string;
    const platform = e.get("platform")?.toString().toUpperCase() as Platform;
    const taskType = e.get("taskType")?.toString().toUpperCase() as TaskType;
    const taskVerificationType = e.get("taskVerificationType")?.toString().toUpperCase() as TaskVerificationType;
    const xp = parseFloat(e.get("xp") as string) as number;
    const expiresAt = new Date(e.get("expiresAt") as string) || null;
    const daily = e.get("daily")?.toString().toLowerCase() === "daily";

    const payload = {
      title,
      description,
      link,
      platform,
      taskType,
      xp,
      expiresAt,
      token,
      daily,
      taskVerificationType
    };
    const result = await addTask(payload);
    if (!result.success) return setError(result.error);
    // success
    let current = dTasks;
    current.unshift(result.success as Task);
    setDTasks(current.slice(0, 4));
    setAddingTask(false);
  };

  const handleDelete = async (taskId: string) => {
    const result = await deleteTask({ token, taskId });
    if (!result.success) return setError(result.error);
    // success
    setDTasks((prev) => prev.filter((t) => t.id !== taskId));
  };
  const handleDisable = async (taskId: string) => {
    const newState = !(dTasks.find((t) => t.id === taskId) as Task).active;
    const result = await toggleStateTask({
      token,
      taskId,
      newState,
    });
    if (!result.success) return setError(result.error);
    // success
    setDTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, active: !task.active } : task
      )
    );
  };

  return (
    <section>
      <div>
        <Link href="/admin/tasks/pending" >
          <Button>Pending Tasks</Button>
        </Link>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Latest Tasks</h2>
        <Button
          onClick={() => {
            setAddingTask(true);
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dTasks.length === 0 && (
          <div className="bg-background text-center">No Tasks</div>
        )}
        {dTasks.map((t, k) => (
          <Card
            style={{
              opacity: t.active ? 1 : 0.4,
              borderColor: t.active ? "" : "gray",
            }}
            key={k}
          >
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {t.taskType} on {t.platform}
                </Badge>
              </div>
              <h3 className="text-lg font-medium">{t.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarIcon className="h-4 w-4" style={{ color: "yellow" }} />
                  <span style={{ color: "yellow" }}>{t.xp} Secrets</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Created: {formatDateSimple(t.createdAt)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {t.expiresAt
                    ? "Expires:" + formatDateSimple(t.expiresAt)
                    : "No Expirement Date"}
                </div>
                <div className="flex gap-2">
                  <form
                    action={async () => {
                      await handleDisable(t.id);
                    }}
                  >
                    <Button variant="outline" size="icon">
                      <DeleteIcon className="h-4 w-4" />
                    </Button>
                  </form>
                  <form
                    action={async () => {
                      await handleDelete(t.id);
                    }}
                  >
                    <Button variant="outline" size="icon">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal
        onClose={() => {
          setAddingTask(false);
        }}
        isOpen={addingTask}
      >
        <div className="max-w-6xl w-full mx-auto flex items-center gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" action={addTaskAction}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input name="title" id="title" type="text" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Task Description</Label>
                    <Input name="description" id="description" type="text" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Task Link</Label>
                  <Input name="link" id="link" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select name="platform">
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                        <SelectItem value="discord">Discord</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskType">Type</Label>
                    <Select name="taskType">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="follow">Follow</SelectItem>
                        <SelectItem value="like">Like</SelectItem>
                        <SelectItem value="repost">Repost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskVerificationType">Verification Type</Label>
                    <Select name="taskVerificationType">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AUTO_API">Automatic</SelectItem>
                        <SelectItem value="SCREEN_SHOT">Screenshot</SelectItem>
                        <SelectItem value="JWT_CODE">Token</SelectItem>
                        <SelectItem value="LINK_PROOF">Verification Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="xp">Secrets</Label>
                    <Input name="xp" id="xp" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expires-at">Expires At</Label>
                    <Input name="expiresAt" id="expiresAt" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="daily">Period</Label>
                    <Select name="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="none">Not Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <p style={{ color: "red" }}>{error}</p>
                </div>
                <FormBtn>Save Task</FormBtn>
              </form>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </section>
  );
}

function DeleteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function FilePenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function LayoutGridIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
