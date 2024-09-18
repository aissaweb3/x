"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { signOut } from "next-auth/react";
import { LoadingWrapper } from "./LoadingWrapper";

export default function AdminHeaderClient({
  pendingCount,
}: {
  pendingCount: number;
}) {
  const links = [
    { name: "NFT", link: "/admin/nft" },
    { name: "Tasks", link: "/admin/tasks" },
    { name: "Users", link: "/admin/users" },
    { name: "Dashboard", link: "/admin/dashboard" },
  ];
  return (
    <>
      <header
        style={{
          fontFamily: "'CustomFont', sans-serif",
        }}
        className="flex h-20 w-full shrink-0 items-center px-4 md:px-6"
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-muted/90">
            <div className="grid gap-[40px] py-6">
              {links.map((l, k) => (
                <Link
                  key={k}
                  href={l.link}
                  className="text-2xl font-medium hover:opacity-70 transition"
                  prefetch={false}
                  style={{
                    fontFamily: "'CustomFont', sans-serif",
                  }}
                >
                  {l.name}
                </Link>
              ))}
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <div className="ml-auto hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuLink
                style={{
                  fontFamily: "'CustomFont', sans-serif",
                }}
                asChild
              >
                  <Link
                    href="/admin/tasks/pending"
                    className="text-2xl px-4 font-medium hover:opacity-70 transition"
                    prefetch={false}
                  >
                    Pending Tasks
                    <span
                      style={{
                        background: "#59a3fe",
                        borderRadius: "100%",
                        padding: "7px 10px",
                        color: "black",
                        fontFamily: "auto",
                        margin: "0 8px",
                      }}
                    >
                      {pendingCount}
                    </span>
                  </Link>
              </NavigationMenuLink>
              {links.map((l, k) => (
                <NavigationMenuLink
                  key={k}
                  style={{
                    fontFamily: "'CustomFont', sans-serif",
                  }}
                  asChild
                >
                  <Link
                    href={l.link}
                    className="text-2xl px-4 font-medium hover:opacity-70 transition"
                    prefetch={false}
                  >
                    {l.name}
                  </Link>
                </NavigationMenuLink>
              ))}
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </Button>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    </>
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
