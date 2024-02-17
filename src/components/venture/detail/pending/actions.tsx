import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { FullVenture } from "@/types/types";
import { ActiveType } from "@prisma/client";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DeleteVentureButton } from "../deleteVenture";

export const VentureDetailPendingActions: React.FC<{
  venture: FullVenture;
}> = async ({ venture }) => {
  const user = await api.users.getCurrent.query();
  if (!user) return null;
  return (
    <>
      {user.active === ActiveType.INVESTOR && (
        <div className="flex w-40 flex-col gap-4 border-b-0 border-border p-4 md:w-64 lg:w-full lg:border-b">
          <Link href={`/venture/${venture.id}/apply`} passHref>
            <Button className="w-full">Apply</Button>
          </Link>

          <Button variant="outline">Message</Button>
          <div className="hidden items-center justify-center text-primary hover:cursor-pointer hover:underline lg:flex">
            <BookmarkIcon className="h-5 w-5 pr-1" />
            <p>Save Investment</p>
          </div>
        </div>
      )}
      {user.active === ActiveType.FOUNDER && user.id === venture.founderId && (
        <div className="flex w-40 flex-col items-center gap-4 border-b-0 border-border p-4 md:w-64 lg:w-full lg:border-b">
          <Link
            className="w-full"
            href={`/venture/${venture.id}/edit`}
            passHref
          >
            <Button className="w-full">Edit</Button>
          </Link>
          <DeleteVentureButton id={venture.id} />

          <Link
            className=" hidden text-center text-primary hover:cursor-pointer hover:underline lg:block"
            href={`/venture/${venture.id}/applications`}
          >
            View Applications
          </Link>
        </div>
      )}
    </>
  );
};
