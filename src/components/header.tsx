import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Logo from "./Logo";
import SignIN from "./signin";
import getToken from "@/utils/server/getToken";
import ToggleGhostSound from "./ToggleGhostSound";
import ManageSession from "./session";
import db from "@/lib/db";
import ManageReferral from "./referral";
import { LoadingWrapper } from "./LoadingWrapper";

export default async function Header({ showGhosts }: { showGhosts: boolean }) {
  const { token, id } = await getToken();

  // await db.user.deleteMany()

  console.log(token, id);
  const links = [
    { name: "Home", link: "/" },
    { name: "Roadmap", link: "/roadmap" },
    { name: "Airdrop", link: "/airdrop" },
    { name: "Contact Us", link: "/contact" },
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
            <div className="grid gap-[40px]">
              <div
                className="h-8 w-full items-center text-center h-[5rem]"
                style={{ display: "ruby" }}
              >
                <Logo />
              </div>
              {links.map((l, k) => (
                <LoadingWrapper
                  className=""
                  key={k}>
                  <Link
                    href={l.link}
                    className="text-2xl font-medium hover:opacity-70 transition"
                    prefetch={false}
                    style={{
                      fontFamily: "'CustomFont', sans-serif",
                    }}
                  >
                    {l.name}
                  </Link>
                </LoadingWrapper>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="ml-auto hidden lg:flex pr-32">
          <div className="absolute top-[-1rem] left-[2rem] w-[10rem]">
            <Logo />
          </div>
          <NavigationMenu>
            <NavigationMenuList className="px-32">
              {links.map((l, k) => (
                <NavigationMenuLink
                  style={{
                    fontFamily: "'CustomFont', sans-serif",
                  }}
                  key={k}
                  asChild
                >
                  <LoadingWrapper className="" >
                    <Link
                      href={l.link}
                      className="text-2xl px-4 font-medium hover:opacity-70 transition"
                      prefetch={false}
                    >
                      {l.name}
                    </Link>
                  </LoadingWrapper>
                </NavigationMenuLink>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <ManageSession token={token} id={id} />
        <ManageReferral token={token} id={id} />
        <div className="absolute right-0 p-4">
          <div className="container justify-center text-end items-center flex">
            <Ghosts showGhosts={showGhosts} />
            <SignIN id={id} />
          </div>
        </div>
      </header>
    </>
  );
}

function Ghosts({ showGhosts }: { showGhosts: boolean }) {
  return (
    showGhosts && (
      <ToggleGhostSound />
    )
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
