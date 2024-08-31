import Image from "next/image";
import RandomGhosts from "./ghost";

export default function Footer() {
  return null;
  return (
    <footer className="py-4">
      <div className="border border-card-foreground rounded-[15px] bg-primary-dark/80 w-fit container mx-auto p-4 sm:px-6 lg:px-8 justify-center gap-4">
        <div>
          <h1
            style={{
              fontFamily: "'CustomFont', sans-serif",
            }}
          >
            Find Us On
          </h1>
        </div>
        <div className="flex gap-2">
          {[
            { name: "twitter", link: "" },
            { name: "discord", link: "" },
            { name: "telegram", link: "" },
            { name: "youtube", link: "" },
          ].map((l, k) => (
            <div key={k}>
              <a
                href={l.link}
                className="text-muted-foreground hover:text-foreground opacity-70 hover:opacity-50 animate-bounce"
                target="_blank"
              >
                <div>
                  <Image
                    src={`/images/social/${l.name}.png`}
                    width="100"
                    height="100"
                    alt={l.name}
                    className="animation animate-bounce"
                  />
                </div>
                <span className="sr-only">{l.name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
