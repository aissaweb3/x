import Modal from "@/components/simple/Modal";
import formatDateSimple from "@/utils/simple/formatDateSimple";
import { Task } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import FormBtn from "@/components/simple/FormBtn";
import { completeTaskServer } from "./server/completeTask";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadCompo from "@/components/upload/uploadCompo";
import { Label } from "@/components/ui/label";

export default function Tasks({
  tasks,
  token,
}: {
  tasks: Task[];
  token: string;
}) {
  const [completeTask, setCompleteTask] = useState<Task | null>(null);
  const [clickedLink, setClickedLink] = useState(false);
  const [error, setError] = useState("");
  const [img, setImg] = useState("");
  const [JWT_CODE, setJWT_CODE] = useState("");
  const [dTasks, setDTasks] = useState(tasks);

  useEffect(() => {
    setClickedLink(false);
  }, [completeTask]);

  const handleComplete = async (e: FormData) => {
    const taskId = e.get("taskId") as string;

    const result = await completeTaskServer({ token, taskId, img, JWT_CODE });
    if (!result.success) return setError(result.error);
    // success
    let current = dTasks.filter((t) => t.id !== taskId);
    setDTasks(current.slice(0, 3));
    setCompleteTask(null);
  };

  return (
    <>
      <div className="grid gap-4">
        {dTasks.length === 0 && (
          <div className="bg-muted text-[#fff]/80 text-center">
            No Tasks To Do.
          </div>
        )}
        {dTasks.map((t, k) => (
          <div
            key={k}
            className="flex cursor-pointer items-center justify-between rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
            onClick={() => {
              setCompleteTask(t);
            }}
          >
            <div className="flex items-center gap-4">
              <Image
                width="40"
                height="40"
                src={`/images/social/${t.platform.toLowerCase()}.png`}
                alt={t.platform.toLowerCase()}
                className="opacity-50"
              />
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-muted-forground opacity-60">
                  {t.description.slice(0, 25)}
                  {"..."}
                  <span className="text-[#ff0]/80">{t.xp} Secrets</span>
                </div>
              </div>
            </div>
            <div className="text-muted-foreground">
              {formatDateSimple(t.createdAt)}
            </div>
          </div>
        ))}
      </div>
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
                  <Label htmlFor="JWT_CODE" >Enter the KEY here :</Label>
                  <Input 
                  onChange={(e)=>{setJWT_CODE(e.target.value)}}
                  value={JWT_CODE}
                  type="text" name="JWT_CODE" id="JWT_CODE" placeholder="eyJ..." required />
                </div>
              ) : completeTask?.taskVerificationType === "SCREEN_SHOT" ? (
                <UploadCompo currentImg={img} handleUploadSuccess={setImg} />
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
    </>
  );
}
