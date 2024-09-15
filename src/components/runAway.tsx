"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function RunAway() {
  return (
    <Button
      className="rounded-full py-8 px-16 bold opacity-40 hover:opacity-60 hover:scale-110 transition"
      style={{
        borderRadius: "1rem",
        fontSize: "xx-large",
        background: "linear-gradient(45deg, #f00, rgb(149 6 6 / 0.37))",
        color: "white",
      }}
      onClick={() => {
        signOut();
      }}
    >
      Get Out
    </Button>
  );
}
