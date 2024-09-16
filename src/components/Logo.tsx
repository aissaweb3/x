import Image from "next/image";
import Link from "next/link";
import { LoadingWrapper } from "./LoadingWrapper";

export default function Logo() {
  return (
    <LoadingWrapper className="" >
      <Link href="/" prefetch={false}>
        <Image
          style={{ top: "0" }}
          src="/images/media/forb.png"
          width="150"
          height="150"
          alt="logo"
        />
      </Link>
    </LoadingWrapper>
  );
}
