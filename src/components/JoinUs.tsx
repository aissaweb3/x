"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function JoinUs() {
  const [join, setJoin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setJoin(true);
    }, 18000);
  }, []);

  return (
    <>
      <main
        style={{
          fontFamily: "'customFont'",
          opacity: join ? 1 : 0,
        }}
        className="transition flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-12 text-white"
      >
        <div
          style={{
            fontFamily: "'customFont'",
          }}
          className="text-center"
        >
          <h1
            style={{
              fontSize: "4rem",
            }}
          >
            Hello There
          </h1>
          <h2 className="opacity-50">
            You must be cold out there, Please COME IN.
          </h2>
        </div>
        <div className="grid gap-8 p-8 justify-center text-center">
          <JoinIn id="" />
          <Link href="https://google.com">
            <Button
              className="rounded-full py-8 px-16 bold opacity-40 hover:opacity-60 hover:scale-110 transition"
              style={{
                borderRadius: "1rem",
                fontSize: "xx-large",
                background: "linear-gradient(45deg, #f00, rgb(149 6 6 / 0.37))",
                color: "white",
              }}
            >
              U Scared ???
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}

import React from "react";
import { Card, CardContent } from "./ui/card";
import JoinIn from "./joinin";
import Link from "next/link";

const AnimatedButton = () => {
  return (
    <button className="relative px-6 py-3 font-medium text-white bg-blue-600 rounded-lg overflow-hidden group">
      <span className="absolute inset-0 bg-blue-500 transition-transform transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
      <span className="relative">Hover Me!</span>
    </button>
  );
};
