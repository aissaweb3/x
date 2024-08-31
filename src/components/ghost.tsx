"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import AudioPlayer from "./ghostAudio";

interface Ghost {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  speed: number;
  direction: number;
}

const randomMathOp = (x: number) => {
  return Math.sin(x);
};

export default function RandomGhosts({ reverse }: { reverse: boolean }) {
  const [ghosts, setGhosts] = useState<Ghost[]>([]);

  useEffect(() => {
    const initialGhosts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.3 + 0,
      speed: Math.random() * 4 + 1,
      direction: Math.random() * 360,
    }));
    setGhosts(initialGhosts);

    const animationFrame = requestAnimationFrame(function animate() {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          const newX = reverse
            ? (ghost.x - ghost.speed * 0.05 + 100) % 100
            : (ghost.x + ghost.speed * 0.05) % 100;

          let newY = reverse
            ? ghost.y - randomMathOp(ghost.x * 0.1) * 0.2
            : ghost.y + randomMathOp(ghost.x * 0.1) * 0.2;

          // Ensure the ghost stays within the viewport height
          if (newY < 0) newY += 100;
          if (newY > 100) newY -= 100;

          // Calculate angle of rotation based on movement
          const deltaX = newX - ghost.x;
          const deltaY = newY - ghost.y;
          const direction = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

          return {
            ...ghost,
            x: newX,
            y: newY,
            direction: direction,
          };
        })
      );
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [reverse]);

  return (
    <>
      {ghosts.map((ghost) => (
        <div
          key={ghost.id}
          className="absolute w-16 h-16 transition-transform duration-300 ease-in-out"
          style={{
            left: `${ghost.x * 1.5 - 10}vw`,
            top: `${ghost.y}vh`,
            width: `${ghost.x}`,
            transform: `scale(${ghost.scale})`,
            opacity: ghost.opacity,
            position: "absolute",
          }}
          aria-hidden="true"
        >
          <Image
            className="absolute"
            style={{
              top: "0",
              transform: `rotate(${90 + ghost.direction}deg)`,
            }}
            src="/images/media/logo1.png"
            width="100"
            height="100"
            alt="logo"
          />
          <div>
            <AudioPlayer />
          </div>
          
        </div>
      ))}
    </>
  );
}


