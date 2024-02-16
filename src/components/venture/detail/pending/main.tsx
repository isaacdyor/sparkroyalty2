import { timeAgo, formatCurrency } from "@/lib/utils";
import { FullVenture } from "@/types/types";
import { VentureStatusType } from "@prisma/client";
import { Status } from "../../status";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteVentureButton } from "../deleteVenture";

export const VentureDetailPendingMain: React.FC<{ venture: FullVenture }> = ({
  venture,
}) => {
  const payoutPercent = (venture.currentPayout / venture.totalPayout) * 100;
  return (
    <div className="flex w-full flex-col border-r-0 border-border lg:w-3/4 lg:border-r">
      <div className="flex w-full items-center justify-between border-b border-border ">
        <div className="flex flex-col gap-2  p-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white ">{venture.title}</h2>
            <Status status={venture.status} />
          </div>
          <p className="text-muted-foreground">
            Posted {timeAgo(venture.createdAt)}
          </p>
          <Link
            className="text-primary hover:cursor-pointer hover:underline lg:hidden"
            href={`/venture/${venture.id}/applications`}
          >
            View Applications
          </Link>
        </div>
        <div className="flex w-64 flex-col items-center gap-4 p-4 lg:hidden">
          <Link
            className="w-full"
            href={`/venture/${venture.id}/edit`}
            passHref
          >
            <Button className="w-full">Edit</Button>
          </Link>
          <DeleteVentureButton id={venture.id} />
          {/* <Link
            className=" text-center text-primary hover:cursor-pointer hover:underline"
            href={`/venture/${venture.id}/applications`}
          >
            View Applications
          </Link> */}
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
