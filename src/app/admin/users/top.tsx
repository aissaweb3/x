"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function Top({
  perPage,
  sort,
  page,
}: {
  perPage: number;
  sort: string;
  page: number;
}) {
  const [top, setTop] = useState(perPage);

  return (
    <div className="flex" >
      <Link href={`?page=${page}&perPage=${top}&sort=${sort}`}>
        <Button>Top</Button>
      </Link>
      <Input
        value={top}
        type="number"
        onChange={(e) => {
          setTop(parseInt(e.target.value));
        }}
      />
    </div>
  );
}
