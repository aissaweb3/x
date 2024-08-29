"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function tzqet() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("xp");
  const tasks = useMemo(
    () => [
      {
        id: 1,
        title: "Finish weekly report",
        description:
          "Compile data and write up the weekly report for the team.",
        link: "#",
        status: "pending",
        xp: 50,
        expirationDate: "2023-09-15",
      },
      {
        id: 2,
        title: "Attend team meeting",
        description: "Join the weekly team meeting to discuss project updates.",
        link: "#",
        status: "done",
        xp: 20,
        expirationDate: "2023-09-14",
      },
      {
        id: 3,
        title: "Respond to customer inquiries",
        description:
          "Check the support inbox and respond to any customer questions.",
        link: "#",
        status: "pending",
        xp: 30,
        expirationDate: "2023-09-16",
      },
      {
        id: 4,
        title: "Update project roadmap",
        description:
          "Review the project roadmap and make any necessary updates.",
        link: "#",
        status: "not done",
        xp: 40,
        expirationDate: "2023-09-17",
      },
      {
        id: 5,
        title: "Prepare presentation for client",
        description:
          "Create a presentation to showcase the latest project updates to the client.",
        link: "#",
        status: "done",
        xp: 60,
        expirationDate: "2023-09-18",
      },
    ],
    []
  );
  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter !== "all") {
      filtered = tasks.filter((task) => task.status === filter);
    }
    if (sort === "xp") {
      filtered = filtered.sort((a, b) => b.xp - a.xp);
    } else {
      filtered = filtered.sort(
        (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)
      );
    }
    return filtered;
  }, [tasks, filter, sort]);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant={filter === "all" ? "primary" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "pending" ? "primary" : "outline"}
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={filter === "done" ? "primary" : "outline"}
            onClick={() => setFilter("done")}
          >
            Completed
          </Button>
          <Button
            variant={filter === "not done" ? "primary" : "outline"}
            onClick={() => setFilter("not done")}
          >
            Not Done
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={sort === "xp" ? "primary" : "outline"}
            onClick={() => setSort("xp")}
          >
            Sort by Secrets
          </Button>
          <Button
            variant={sort === "expiration" ? "primary" : "outline"}
            onClick={() => setSort("expiration")}
          >
            Sort by Expiration
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link href="#" className="text-primary" prefetch={false}>
                  View
                </Link>
                <Badge
                  variant={
                    task.status === "pending"
                      ? "warning"
                      : task.status === "done"
                      ? "success"
                      : "danger"
                  }
                >
                  {task.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
