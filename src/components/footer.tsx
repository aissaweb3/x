import Image from "next/image";
import RandomGhosts from "./ghost";

export default function Footer() {
  return (
    <footer style={{fontFamily: "auto"}} className="bg-[#0e2f50]/40 fixed bottom-0 w-[100vw] py-2">
        <div className="flex justify-center space-x-4">
          {[
            { name: "twitter", link: "https://x.com/BooForbidden" },
            { name: "discord", link: "https://discord.com/invite/F9bYZQeBbw" },
            { name: "telegram", link: "https://t.me/forbiddenforestgroup" },
            {
              name: "youtube",
              link: "https://youtube.com/@forbiddenforest-boo",
            },
          ].map((l, k) => (
            <a
              key={k}
              href={l.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-foreground transition-colors"
            >
              <Image alt="" src={`/images/social/${l.name}.png`} width="20" height="20" />
              <span className="sr-only">{l.name}</span>
            </a>
          ))}
        </div>
    </footer>
  );
}
