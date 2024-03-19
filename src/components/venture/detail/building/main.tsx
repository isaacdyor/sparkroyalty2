import { formatCurrency, timeAgo } from "@/lib/utils";
import type { VentureApplicationUser } from "@/server/api/routers/types";
import { api } from "@/trpc/server";
import { BookmarkIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid";
import { ActiveType } from "@prisma/client";
import Link from "next/link";
import { Status } from "../../status";
import { VentureDetailBuildingActions } from "./actions";

export const VentureDetailBuildingMain: React.FC<{
  venture: VentureApplicationUser;
}> = async ({ venture }) => {
  const user = await api.users.getCurrent.query();
  if (!user) return null;
  return (
    <div className="flex w-full flex-col border-r-0 border-border lg:w-3/4 lg:border-r">
      <div className="flex w-full items-center justify-between border-b border-border ">
        <div className="flex flex-col gap-2  p-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white ">{venture.title}</h2>
            <div className="hidden sm:block">
              <Status status={venture.status} />
            </div>
          </div>
          <p className="text-muted-foreground">
            Posted {timeAgo(venture.createdAt)}
          </p>
        </div>
        <div className="block lg:hidden">
          <VentureDetailBuildingActions venture={venture} />
        </div>
      </div>

      <div className="flex flex-col border-b border-border p-6">
        <h2 className="pb-2 font-bold text-white">Company Description:</h2>
        <p className="text-white">{venture.description}</p>
      </div>
      <div className="flex h-24 justify-between border-b border-border p-6">
        <div className="flex flex-col">
          <p className="text-muted-foreground">Roytalty Rate:</p>
          <p>{venture.percent}%</p>
        </div>
        <div className="flex flex-col">
          <p className="text-muted-foreground">Total Payout:</p>
          <p>{formatCurrency(venture.totalPayout)}</p>
        </div>
      </div>

      <div className="flex flex-col border-b border-border p-6">
        <h2 className="pb-2 font-bold text-white">Services Needed:</h2>
        <p className="text-white">{venture.workDescription}</p>
      </div>
      <div className="flex flex-col border-b border-border p-6 lg:border-b-0">
        <div className="w-1/2">
          <h2 className="pb-2 font-bold text-white">Recommended Skills:</h2>
          <div className="mt-2 flex flex-wrap ">
            {venture.skills?.map((skill, index) => (
              <p
                className="mb-1 mr-1 rounded-2xl bg-secondary p-1 px-2"
                key={index}
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
