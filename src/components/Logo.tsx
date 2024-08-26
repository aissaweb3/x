import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Image
        className="absolute"
        style={{ top: "0" }}
        src="/images/media/logo.png"
        width="150"
        height="150"
        alt="logo"
      />
    </Link>
  );
}
