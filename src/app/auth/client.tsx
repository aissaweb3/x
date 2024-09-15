"use client";

import { Button } from "@/components/ui/button";

export default async function Client() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#1a1a1a] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-[#ff6b6b] p-2 text-[#1a1a1a] animate-bounce">
          <GhostIcon className="h-full w-full" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl animate-pulse">
          Welcome to the Haunted Realm
        </h1>
        <p className="mt-4 text-[#b3b3b3] animate-wiggle">
          Embark on a thrilling adventure through the darkest corners of our
          haunted website. Sign in with your Discord or Twitter account to begin
          your quest.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 animate-bounce">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 hover:bg-[#ff6b6b] hover:text-[#1a1a1a]"
          >
            Discord
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 hover:bg-[#ff6b6b] hover:text-[#1a1a1a]"
          >
            Twitter
          </Button>
        </div>
      </div>
    </div>
  );
}

function GhostIcon(props: any) {
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
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
    </svg>
  );
}
