import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" prefetch={false}>
      <Image
        className="animate-pulse"
        style={{ top: "0" }}
        src="/images/media/forb.png"
        width="150"
        height="150"
        alt="logo"
      />
    </Link>
  );
}
