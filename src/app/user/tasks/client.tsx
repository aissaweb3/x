"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Task } from "@prisma/client";
import Image from "next/image";
import Modal from "@/components/simple/Modal";
import { completeTaskServer } from "../dashboard/server/completeTask";
import { CardDescription, CardFooter } from "@/components/ui/card";
import FormBtn from "@/components/simple/FormBtn";
import formatDateSimple from "@/utils/simple/formatDateSimple";
import JumpScareButton from "@/components/click";
import { Input } from "@/components/ui/input";
import UploadCompo from "@/components/upload/uploadCompo";
import { Label } from "@/components/ui/label";

type TaskPro = Task & { status: string };

export default function Client({
  tasksSTR,
  token,
}: {
  tasksSTR: string;
  token: string;
}) {
  const [filter, setFilter] = useState("none");
  const [sort, setSort] = useState("xp");
  const [tasks, setTasks] = useState<TaskPro[]>(JSON.parse(tasksSTR));
  const [img, setImg] = useState("");
  const [JWT_CODE, setJWT_CODE] = useState("");
  const [vLink, setLink] = useState("");

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter !== "all") {
      filtered = tasks.filter(
        (task) =>
          task.status.toString().toLowerCase() === filter ||
          (filter === "daily" && task.daily)
      );
    }
    if (sort === "xp") {
      filtered = filtered.sort((a, b) => b.xp - a.xp);
    } else {
      filtered = filtered.sort(
        (a, b) =>
          ((new Date(a.createdAt).getMilliseconds() as number) -
            new Date(b.createdAt).getMilliseconds()) as number
      );
    }
    return filtered;
  }, [tasks, filter, sort]);

  const [completeTask, setCompleteTask] = useState<Task | null>(null);
  const [clickedLink, setClickedLink] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setClickedLink(false);
  }, [completeTask]);

  const handleComplete = async (e: FormData) => {
    const taskId = e.get("taskId") as string;

    const result = await completeTaskServer({
      token,
      taskId,
      img,
      JWT_CODE,
      vLink,
    });
    if (!result.success) return setError(result.error);
    // success
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "PENDING" } : task
      )
    );
    setCompleteTask(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1
            style={{ fontFamily: "'CustomFont'", fontSize: "3rem" }}
            className="py-8 text-3xl font-bold"
          >
            My Tasks
          </h1>
        </div>
        <div className="py-4 text-3xl" style={{ fontFamily: "'CustomFont'" }}>
          <span className="text-8xl">!</span> Finish Tasks to Unlock More
          Secrets.
        </div>
        {/*<JumpScareButton>test link</JumpScareButton>*/}
        <div className="mb-6 grid-cols-1 grid items-center justify-between">
          <div className="flex items-center gap-4 mb-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
        {/*
	    <Button
              variant={filter === "daily" ? "default" : "outline"}
              onClick={() => setFilter("daily")}
            >
              Daily
            </Button>
		*/}
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
            <Button
              variant={filter === "none" ? "default" : "outline"}
              onClick={() => setFilter("none")}
            >
              Not Done
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant={sort === "xp" ? "default" : "outline"}
              onClick={() => setSort("xp")}
            >
              Sort by Secrets
            </Button>
            <Button
              variant={sort === "date" ? "default" : "outline"}
              onClick={() => setSort("date")}
            >
              Sort by Date
            </Button>
          </div>
        </div>
        {filteredTasks.length === 0 && (
          <div className="p-4 bg-muted text-[#fff] opacity-50 text-center">
            No Tasks To Do.
          </div>
        )}
        <div
          style={{ minHeight: "10.2rem", placeItems: "center" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="w-full max-w-sm bg-background p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/images/social/${task.platform.toLowerCase()}.png`}
                    alt="Platform Icon"
                    className="w-8 h-8 rounded-full"
                    width="32"
                    height="32"
                    style={{ aspectRatio: "32/32", objectFit: "cover" }}
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {task.platform.toLowerCase()}
                  </span>
                </div>
                <div
                  style={{
                    color:
                      task.status === "COMPLETED"
                        ? "yellow"
                        : task.status === "PENDING"
                        ? "#ddd"
                        : "",
                    background:
                      task.status === "COMPLETED"
                        ? "#ffff0036"
                        : task.status === "PENDING"
                        ? "#dddddd36"
                        : "",
                  }}
                  className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium"
                >
                  {task.status === "NONE"
                    ? "Not Done"
                    : task.status.toLowerCase()}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-[#ff0]" />
                  <span className="text-sm font-medium text-[#ff0]">
                    {task.xp} Secrets
                  </span>
                </div>
              </div>
              {task.status === "NONE" ? (
                <Button
                  onClick={() => {
                    setCompleteTask(task);
                  }}
                  className="w-full"
                >
                  Mark as Complete
                </Button>
              ) : (
                <Button disabled className="w-full">
                  Mark as Complete
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>

      <Modal
        isOpen={completeTask !== null}
        onClose={() => {
          setCompleteTask(null);
        }}
      >
        <Card className="bg-[#020a10ba] p-4" style={{ maxWidth: "25rem" }}>
          <CardHeader>
            <CardTitle>Complete The Task</CardTitle>
            <CardDescription>
              Finish the task below to earn{" "}
              <span className="text-[#ff0]/80">{completeTask?.xp} Secrets</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">{completeTask?.title}</h3>
                <p className="text-muted-foreground">
                  {completeTask?.description}
                </p>
              </div>
            </div>

            <div className="pt-16">
              {completeTask?.taskVerificationType === "JWT_CODE" ? (
                <div>
                  <Label htmlFor="JWT_CODE">Enter the Secret Word here :</Label>
                  <Input
                    type="text"
                    name="JWT_CODE"
                    id="JWT_CODE"
                    placeholder="Secret Word"
                    required
                  />
                </div>
              ) : completeTask?.taskVerificationType === "SCREEN_SHOT" ? (
                <UploadCompo currentImg={img} handleUploadSuccess={setImg} />
              ) : completeTask?.taskVerificationType === "LINK_PROOF" ? (
                <div>
                  <Label htmlFor="vLink">Enter the Link Proof here :</Label>
                  <Input
                    type="text"
                    name="vLink"
                    id="vLink"
                    placeholder="https://..."
                    required
                  />
                </div>
              ) : null}
            </div>
          </CardContent>
          <CardFooter
            className="flex items-end"
            style={{ placeContent: "end" }}
          >
            <form action={handleComplete}>
              <input type="hidden" name="taskId" value={completeTask?.id} />
              {clickedLink ? (
                <FormBtn>Complete</FormBtn>
              ) : (
                <a
                  href={completeTask?.link as string}
                  className="text-white underline hover:opacity-80"
                  target="_blank"
                  onClick={() => {
                    setClickedLink(true);
                  }}
                >
                  <Button>Task Link</Button>
                </a>
              )}
            </form>
            
      <Modal
        isOpen={completeTask !== null}
        onClose={() => {
          setCompleteTask(null);
        }}
      >
        <Card className="bg-[#020a10ba] p-4" style={{maxWidth: "25rem"}} >
          <CardHeader>
            <CardTitle>Complete The Task</CardTitle>
            <CardDescription>
              Finish the task below to earn{" "}
              <span className="text-[#ff0]/80">{completeTask?.xp} Secrets</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">{completeTask?.title}</h3>
                <p className="text-muted-foreground">
                  {completeTask?.description}
                </p>
              </div>
            </div>

            <div className="pt-16">
              {completeTask?.taskVerificationType === "JWT_CODE" ? (
                <div>
                  <Label htmlFor="JWT_CODE">Enter the Secret Word here :</Label>
                  <Input
                    type="text"
                    id="JWT_CODE"
                    value={JWT_CODE}
                    onChange={(e)=>{setJWT_CODE(e.target.value)}}
                    placeholder="Secret Word"
                    required
                  />
                </div>
              ) : completeTask?.taskVerificationType === "SCREEN_SHOT" ? (
                <UploadCompo currentImg={img} handleUploadSuccess={setImg} />
              ) : completeTask?.taskVerificationType === "LINK_PROOF" ? (
                <div>
                  <Label htmlFor="vLink">Enter the Link Proof here :</Label>
                  <Input
                    type="text"
                    id="vLink"
                    value={vLink}
                    onChange={(e)=>{setLink(e.target.value)}}
                    placeholder="https://..."
                    required
                  />
                </div>
              ) : null}
            </div>
          </CardContent>
          <CardFooter
            className="flex items-end"
            style={{ placeContent: "end" }}
          >
            <form action={handleComplete}>
              <input type="hidden" name="taskId" value={completeTask?.id} />
              {clickedLink ? (
                <FormBtn>Complete</FormBtn>
              ) : (
                <a
                  href={completeTask?.link as string}
                  className="text-white underline hover:opacity-80"
                  target="_blank"
                  onClick={() => {
                    setClickedLink(true);
                  }}
                >
                  <Button>Task Link</Button>
                </a>
              )}
            </form>
            <Modal
              isOpen={error !== ""}
              onClose={() => {
                setError("");
              }}
            >
              <Card
                className="w-full max-w-md p-8"
                style={{ background: "red", borderColor: "white" }}
              >
                <p style={{ color: "white" }}>{error}</p>
              </Card>
            </Modal>
          </CardFooter>
        </Card>
      </Modal>
          </CardFooter>
        </Card>
      </Modal>
    </>
  );
}

function CalendarIcon(props: any) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
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
