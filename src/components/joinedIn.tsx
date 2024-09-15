import { Button } from "@/components/ui/button";

export default function JoinedIn() {
  return (
    <>
      <main
        style={{
          fontFamily: "'customFont'",
        }}
        className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-12 text-white"
      >
          <div>
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
                Welcome BACK Home
              </h1>
              <h2 className="opacity-50" >You are now INSIDE the House</h2>
            </div>
            <div className="grid gap-8 p-8 justify-center text-center">
              <Link href="/user/dashboard">
                <Button
                  className="rounded-full py-8 px-16 bold opacity-60 hover:opacity-100 hover:scale-110 transition"
                  style={{
                    borderRadius: "1rem",
                    boxShadow: "0 0 10px 0 #2dd3d882",
                    fontSize: "xx-large",
                    background:
                      "linear-gradient(45deg, #38fdfd, rgb(6 91 149 / 0.37))",
                    color: "black",
                  }}
                >
                  Guests Room
                </Button>
              </Link>
              <RunAway />
            </div>
          </div>
      </main>
    </>
  );
}

import React from "react";
import { Card, CardContent } from "./ui/card";
import JoinIn from "./joinin";
import Link from "next/link";
import { signOut } from "next-auth/react";
import RunAway from "./runAway";

const AnimatedButton = () => {
  return (
    <button className="relative px-6 py-3 font-medium text-white bg-blue-600 rounded-lg overflow-hidden group">
      <span className="absolute inset-0 bg-blue-500 transition-transform transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
      <span className="relative">Hover Me!</span>
    </button>
  );
};
