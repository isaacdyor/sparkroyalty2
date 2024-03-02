import { Button } from "@/components/ui/button";
import type { VentureApplicationUser } from "@/server/api/routers/types";
import { api } from "@/trpc/server";
import { ActiveType } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { DeleteVentureButton } from "../deleteVenture";
import { UpdateButton } from "./updateButton";

export const VentureDetailBuildingActions: React.FC<{
  venture: VentureApplicationUser;
}> = async ({ venture }) => {
  const user = await api.users.getCurrent.query();
  if (!user) return null;
  return (
    <>
      {user.active === ActiveType.INVESTOR && (
        <div className="flex w-40 flex-col gap-4 border-b-0 border-border p-4 md:w-64 lg:w-full lg:border-b">
          <UpdateButton venture={venture} />

          <Button variant="outline">Message</Button>
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
