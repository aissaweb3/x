import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";

export default function Contact() {
  return (
    <div
      style={{
        fontFamily: "'CustomFont'",
        backgroundImage: "url('/images/media/dashboard.jpg')",backgroundSize: "cover", minHeight: "100vh",
      }}
    >
      <div className="relative" style={{ zIndex: "2" }}>
        <Header showGhosts />
      </div>
      <div className="w-full">
        <section className="w-full grid mt-8 justify-center py-6 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Horrors! Get in touch with us
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Ahhh! Have a question or need assistance? Fill out the form
                    below and our team will get back to you as soon as possible.
                    The horrors, the horrors!
                  </p>
                </div>
              </div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Contact Us, if you dare!</CardTitle>
                  <CardDescription>
                    Fill out the form to send us a message, if you can stomach
                    it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name, if you must"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email, if you dare"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter your message, if you can bear it"
                        className="min-h-[150px]"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Submit, if you must
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
