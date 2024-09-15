"use client";
import { useState, useEffect } from "react";
import RandomGhosts from "./ghost";
import { Volume2, VolumeX } from "lucide-react";

export default function ToggleGhostSound() {
  const [sound, setSound] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedSound = localStorage.getItem("sound");
      return savedSound !== null ? JSON.parse(savedSound) : false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sound", JSON.stringify(sound));
    }
  }, [sound]);

  const toggleSound = () => {
    setSound((prevSound) => !prevSound);
  };

  return (
    <>
      <div className="p-4">
        <button onClick={toggleSound}>
          {sound ? (
            <Volume2 className="h-6 w-6" />
          ) : (
            <VolumeX className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="absolute w-[200vw] top-0">
        <RandomGhosts sound={sound} reverse={false} />
        <RandomGhosts sound={sound} reverse={true} />
      </div>
    </>
  );
}
