"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { signIn } from "next-auth/react";
import { User } from "@prisma/client";

export function Client({ user }: { user: User }) {
  const socials = [
    { name: "Discord", value: user.discord },
    { name: "Twitter", value: user.twitter },
    //{ name: "Google", value: user.twitter },
  ];
  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <h1 style={{ fontFamily: "CustomFont", fontSize: "5rem" }}>
            WHO ARE YOU
          </h1>
        </div>
        <div className="w-full bg-background rounded-lg shadow-lg p-6 space-y-6">
          <h3 className="text-lg font-bold">Connect Accounts</h3>
          <div
          //className="grid grid-cols-3 gap-4"
          >
            <div>
              {socials.map((s, k) => (
                <div key={k}>
                  <Input
                    //value={s.value.startsWith("nullvalue") ? "" : s.value.split("-name")[1]}
                  />
                  <Button
                    onClick={() => {
                      signIn(s.name);
                    }}
                    variant="outline"
                    className="flex flex-col items-center gap-2"
                  >
                    <span>{s.name}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full bg-background rounded-lg shadow-lg p-6 space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="text"
                placeholder="email@example.com"
                className="px-3 py-2 bg-muted rounded-md focus:ring-0 focus:border-primary"
                //value={user.email.startsWith("nullvalue") ? "" : user.email}
              />
            </div>
            <Button className="w-full">Save Email</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function DiscIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function TwitterIcon(props: any) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
