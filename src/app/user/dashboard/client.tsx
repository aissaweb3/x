"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Tasks from "./tasks";
import { Task } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Client({
  tasksSTR,
  token,
  xp,
  count,
}: {
  tasksSTR: string;
  token: string;
  xp: number;
  count: number;
}) {
  const tasks: Task[] = JSON.parse(tasksSTR);
  return (
    <div
      style={
        {
          //background: "url('/images/media/bg.jpg')",
        }
      }
      className="flex flex-col gap-8 p-6 sm:p-10"
    >
      <div style={{ height: "60vh" }}></div>
      <div
        style={{
          height: "40vh",
          top: "40vh",
          position: "absolute",
        }}
      ></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>XP Points</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div
              className="text-6xl font-bold"
              style={{ fontFamily: "'CustomFont'" }}
            >
              {xp}
            </div>
            <TrophyIcon className="h-8 w-8 text-white opacity-50" />
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>Incomplete Tasks</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-4xl font-bold">{count}</div>
            <ClipboardListIcon className="h-8 w-8 text-white opacity-50" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex gap-4" style={{ alignItems: "center" }}>
            <CardTitle>Latest Tasks</CardTitle>
            <Link href="/user/tasks">
              <Button>See More</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Tasks tasks={tasks} token={token} />
        </CardContent>
      </Card>
    </div>
  );
}

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CircleCheckIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClipboardListIcon(props: any) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

function ClockIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TrophyIcon(props: any) {
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
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
