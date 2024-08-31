"use client";
import { useState, useEffect } from "react";

export default function FlickeringText({ children }: { children: any }) {
  const [visible, setVisible] = useState(true);
  const [x, setx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v);
      setx(Math.random() * 100 + 300);
    }, Math.random() * 600 + 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute font-bold text-4xl"
      aria-label="Flickering text: Beware"
      style={{ fontFamily: "'CustomFont'", fontSize: x + "px", color: "red" }}
    >
      <div className={visible ? "opacity-30" : "opacity-0"}>{children}</div>
    </div>
  );
}
