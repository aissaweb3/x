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

export default async function Header({ showGhosts }: { showGhosts: boolean }) {
  const { token, id } = await getToken();

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
            </div>
            <SignIN id={id} />
          <Ghosts showGhosts={showGhosts} />
            
          </SheetContent>
        </Sheet>
        <Logo />
        <div className="ml-auto hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((l, k) => (
                <NavigationMenuLink
                  style={{
                    fontFamily: "'CustomFont', sans-serif",
                  }}
                  key={k}
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
            </NavigationMenuList>
          </NavigationMenu>
          <SignIN id={id} />
          <Ghosts showGhosts={showGhosts} />
          </div>
      </header>
    </>
  );
}

function Ghosts({ showGhosts }: { showGhosts: boolean }) {
  return showGhosts && (
    <div className="mt-[6px] p-4" >
      <ToggleGhostSound />
    </div>
  )
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
