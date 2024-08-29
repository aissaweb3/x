import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

export function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <main className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-background shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <h2 className="text-2xl font-bold">Secrets</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">1,250</p>
                  <p className="text-muted-foreground">Experience Points</p>
                </div>
                <TrophyIcon className="h-12 w-12 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <h2 className="text-2xl font-bold">Pending Tasks</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Complete onboarding</p>
                    <p className="text-muted-foreground text-sm">50 Secrets</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Write blog post</p>
                    <p className="text-muted-foreground text-sm">100 Secrets</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Attend team meeting</p>
                    <p className="text-muted-foreground text-sm">25 Secrets</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <h2 className="text-2xl font-bold">Profile</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="User Avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-muted-foreground text-sm">@johndoe</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-4">
          {[
            { name: "twitter", link: "" },
            { name: "discord", link: "" },
            { name: "telegram", link: "" },
            { name: "youtube", link: "" },
          ].map((l, k) => (
            <a
              key={k}
              href={l.link}
              className="text-muted-foreground hover:text-foreground"
              target="_blank"
            >
              <div>
                <Image
                  src={`/images/social/${l.name}.png`}
                  width="100"
                  height="100"
                  alt={l.name}
                  className="hover:animate-bounce"
                />
              </div>
              <span className="sr-only">{l.name}</span>
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

function TrophyIcon(props: any) {
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
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
