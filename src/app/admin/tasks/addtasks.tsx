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

const platformTaskTypes: Record<Platform, TaskType[]> = {
  TWITTER: ["FOLLOW", "LIKE", "REPOST", "COMMENT"],
  YOUTUBE: ["WATCH"],
  TELEGRAM: ["FOLLOW"],
  DISCORD: ["FOLLOW"],
};

const verificationTypes: TaskVerificationType[] = [
  "AUTO_API",
  "SCREEN_SHOT",
  "JWT_CODE",
  "LINK_PROOF",
];

export default function Add({ token, tasks }: { token: string; tasks: string }) {
  const [addingTask, setAddingTask] = useState(false);
  const latestTasks: Task[] = JSON.parse(tasks);
  const [error, setError] = useState("");
  const [taskToken, setToken] = useState("");
  const [dTasks, setDTasks] = useState<Task[]>(latestTasks);
  
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "">("");
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType | "">("");

  const addTaskAction = async (e: FormData) => {
    const title = e.get("title") as string;
    const description = e.get("description") as string;
    const link = e.get("link") as string;
    const platform = selectedPlatform as Platform;
    const taskType = selectedTaskType as TaskType;
    const xp = parseFloat(e.get("xp") as string);
    const channelId = e.get("channelId") as string;
    const taskVerificationType = e.get("taskVerificationType") as TaskVerificationType;

    const payload = {
      title,
      description,
      link,
      platform,
      taskType,
      xp,
      token,
      daily: false,
      taskVerificationType,
      channelId,
    };

    const result = await addTask(payload);
    if (!result.success) return setError(result.error);

    // success
    setDTasks((prev) => [result.success as Task, ...prev.slice(0, 3)]);
    setAddingTask(false);
    setToken(result.taskToken)
  };

  const handleDelete = async (taskId: string) => {
    const result = await deleteTask({ token, taskId });
    if (!result.success) return setError(result.error);
    
    setDTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleDisable = async (taskId: string) => {
    const newState = !(dTasks.find((t) => t.id === taskId) as Task).active;
    const result = await toggleStateTask({ token, taskId, newState });
    if (!result.success) return setError(result.error);
    
    setDTasks((tasks) => tasks.map((task) => 
      task.id === taskId ? { ...task, active: !task.active } : task
    ));
  };

  const handlePlatformChange = (value: string) => {
    setSelectedPlatform(value as Platform);
    setSelectedTaskType(""); // Reset task type when platform changes
  };

  return (
    <section>
      <div>
        <Link href="/admin/tasks/pending">
          <Button>Pending Tasks</Button>
        </Link>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Latest Tasks</h2>
        <Button onClick={() => setAddingTask(true)}>
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
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleDisable(t.id)}>
                    {
                      //<DeleteIcon className="h-4 w-4" />
                    }
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(t.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal onClose={() => setAddingTask(false)} isOpen={addingTask}>
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
                    <Select name="platform" onValueChange={handlePlatformChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(platformTaskTypes).map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskType">Task Type</Label>
                    <Select
                      name="taskType"
                      onValueChange={(e)=>{setSelectedTaskType(e as TaskType)}}
                      value={selectedTaskType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedPlatform &&
                          platformTaskTypes[selectedPlatform].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Conditional Input for Telegram Channel */}
                {selectedPlatform === "TELEGRAM" && (
                  <div className="space-y-2">
                    <Label htmlFor="channelId">Telegram Channel Id (@...)</Label>
                    <Input name="channelId" id="channelId" type="text" placeholder="@123456798" />
                  </div>
                )}

                {/* Conditional Input for Discord Server Id */}
                {selectedPlatform === "DISCORD" && (
                  <div className="space-y-2">
                    <Label htmlFor="channelId">Discord Server Channel</Label>
                    <Input name="channelId" id="channelId" type="text" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="taskVerificationType">Verification Type</Label>
                  <Select
                    name="taskVerificationType"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification type" />
                    </SelectTrigger>
                    <SelectContent>
                      {verificationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="xp">XP Value</Label>
                    <Input name="xp" id="xp" type="number" />
                  </div>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <FormBtn>Save Task</FormBtn>
              </form>
            </CardContent>
          </Card>
        </div>
      </Modal>
      <Modal isOpen={taskToken !== ""} onClose={()=>{setToken("")}} >
        <Card>
          <CardContent>
            <div className="w-[400px]" >
              <h2>{taskToken}</h2>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </section>
  );
}

// Icon components (DeleteIcon, PlusIcon, StarIcon, TrashIcon) remain unchanged...

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
