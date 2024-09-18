import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";
import formatDateSimple from "@/utils/simple/formatDateSimple";
import isConnected from "@/utils/simple/isConnected";
import { User } from "@prisma/client";
import Link from "next/link";
import getData from "./server/getData";
import { Button } from "@/components/ui/button";

export default async function Page({ searchParams }: { searchParams: any }) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 10;
  const filter = searchParams.filter || "Latest";
  const data = await getData(perPage, page, filter);

  const totalPages = Math.ceil(data.itemCount / perPage);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const isPageOutOfRange = page > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  const filters = ["Latest", "XP", "Referrals", "Oldest"];

  return (
    <div className="p-8">
      <div className="flex gap-4">
        {filters.map((filter, key) => (
          <Link href={`?page=${page}&filter=${filter}`} key={key}>
            <Button>Sort by the {filter}</Button>
          </Link>
        ))}
      </div>
      <div className="container mx-auto mt-8">
        <Table>
          <TableCaption>Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Discord</TableHead>
              <TableHead>Twitter</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>XP</TableHead>
              <TableHead>Referrals</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items
              .filter((u) => u.email !== "admin")
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ opacity: isConnected(user.discordName) === "Not Connected" ? 0.2 : 1 }} >{isConnected(user.discordName)}</TableCell>
                  <TableCell style={{ opacity: isConnected(user.twitterName) === "Not Connected" ? 0.2 : 1 }} >{isConnected(user.twitterName)}</TableCell>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell>{user.xp}</TableCell>
                  <TableCell>{user.referrals}</TableCell>
                  <TableCell>{formatDateSimple(user.createdAt)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {isPageOutOfRange ? (
          <div>No more pages...</div>
        ) : (
          <div className="flex justify-center items-center mt-16">
            <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
              {page === 1 ? (
                <div className="opacity-60" aria-disabled="true">
                  Previous
                </div>
              ) : (
                <Link href={`?page=${prevPage}&filter=${filter}`} aria-label="Previous Page">
                  Previous
                </Link>
              )}

              {pageNumbers.map((pageNumber, index) => (
                <Link
                  key={index}
                  className={
                    page === pageNumber
                      ? "bg-green-500 fw-bold px-2 rounded-md text-black"
                      : "hover:bg-green-500 px-1 rounded-md"
                  }
                  href={`?page=${pageNumber}&filter=${filter}`}
                >
                  {pageNumber}
                </Link>
              ))}

              {page === totalPages ? (
                <div className="opacity-60" aria-disabled="true">
                  Next
                </div>
              ) : (
                <Link href={`?page=${nextPage}&filter=${filter}`} aria-label="Next Page">
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
