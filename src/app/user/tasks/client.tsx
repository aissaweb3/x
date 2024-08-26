"use client";

import { useState, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Task, TaskStatus } from "@prisma/client";
type TaskPro = Task & { userStatus: TaskStatus };

export default function Client({ tasksSTR }: { tasksSTR: string }) {
  const [filter, setFilter] = useState("all");
  const [platform, setPlatform] = useState("all");
  const initTasks: TaskPro[] = JSON.parse(tasksSTR);
  const [tasks, setTasks] = useState(initTasks);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter !== "all") {
      filtered = filtered.filter(
        (task) => task.userStatus.status === "PENDING"
      );
    }
    if (filter === "completed") {
      filtered = filtered.filter(
        (task) => task.userStatus.status === "COMPLETED"
      );
    }
    if (platform !== "all") {
      filtered = filtered.filter((task) => task.platform === platform);
    }
    return filtered;
  }, [filter, platform, tasks]);
  const handleTaskComplete = (id: string) => {
    /*setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );*/
  };
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">John Doe Tasks</h1>
          <p className="text-muted-foreground">Manage your daily tasks</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="bg-background text-foreground">
              <SelectValue placeholder="Filter tasks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="bg-background text-foreground">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Due:</div>
                <Checkbox
                  checked={task.userStatus.status === "COMPLETED"}
                  onCheckedChange={() => handleTaskComplete(task.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
