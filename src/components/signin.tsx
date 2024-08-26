"use client";
import Image from "next/image";
import Link from "next/link";
import Modal from "./simple/Modal";
import { useState } from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import providers from "./homePage/providers";

export default function SignIN({ id }: { id: string }) {
  const [wantsToSignIn, setWantsToSignIn] = useState(false);

  if (id)
    return (
      <div
        style={{
          fontFamily: "'CustomFont', sans-serif",
        }}
        className="flex gap-2 mx-4 w-fit"
      >
        <div className="grid align-center" style={{ alignContent: "center" }}>
          <Link className="hover:opacity-70" href="/user/dashboard">
            Dashboard
          </Link>
        </div>
        <div>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    );

  return (
    <div
      style={{
        fontFamily: "'CustomFont', sans-serif",
      }}
    >
      <button
        onClick={() => {
          setWantsToSignIn(true);
        }}
        className="font-bold text-white bg-primary-light/50 hover:bg-primary-light hover:text-black transition inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Sign In
      </button>

      <Modal
        isOpen={wantsToSignIn}
        onClose={() => {
          setWantsToSignIn(false);
        }}
      >
        <div className="sm:max-w-[425px]">
          <div style={{ zIndex: 0 }} className="absolute w-full">
            <Image
              src="/images/media/boo.png"
              width="100"
              height="100"
              alt=""
              className="w-[100%] opacity-40"
            />
          </div>
          <div>
            <div className="text-4xl text-white font-bold">Login</div>
          </div>
          <div style={{ zIndex: 1 }} className="relative grid gap-4 py-6">
            {providers.map((p, key) => (
              <button
                onClick={() => signIn(p.toLowerCase())}
                key={key}
                className="font-bold text-4xl text-white bg-primary-light/80 hover:bg-primary-light hover:text-black transition inline-flex items-center justify-center rounded-md px-4 py-2 font-medium text-primary-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                <Image
                  src={`/images/social/${p}.png`}
                  alt={p}
                  className="h-20 w-20 mr-2 rounded-full border bg-white"
                  width={50}
                  height={50}
                  style={{ aspectRatio: "20/20", objectFit: "cover" }}
                />
                Sign in with {p}
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

function LogInIcon(props: any) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
