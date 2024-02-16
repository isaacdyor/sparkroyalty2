import { FullVenture } from "@/types/types";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { VentureStatusType, ActiveType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { formatCurrency } from "@/lib/utils";
import { MultiStar } from "../multiStar";
import { DeleteVentureButton } from "../deleteVenture";

export const VentureDetailPendingSide: React.FC<{ venture: FullVenture }> = ({
  venture,
}) => {
  const user = venture.founder.user;

  const totalSpent = venture.founder.ventures
    .map((venture) => {
      return venture.currentPayout;
    })
    .reduce((a, b) => a + b, 0);

  const openInvestments = venture.founder.ventures.filter(
    (venture) => venture.status === VentureStatusType.PENDING,
  ).length;

  const paidInvesmtnets = venture.founder.ventures.filter(
    (venture) => venture.currentPayout > 0,
  ).length;

  return (
    <div className="flex h-full w-full shrink-0 flex-col lg:w-80">
      {user.active === ActiveType.INVESTOR && (
        <div className="flex flex-col gap-4 border border-transparent border-b-border p-4">
          <Link href={`/venture/${venture.id}/apply`} passHref>
            <Button className="w-full">Apply</Button>
          </Link>

          <Button variant="outline">Message</Button>
          <div className="flex items-center justify-center text-primary hover:cursor-pointer hover:underline">
            <BookmarkIcon className="h-5 w-5 pr-1" />
            <p>Save Investment</p>
          </div>
        </div>
      )}
      {user.active === ActiveType.FOUNDER && user.id === venture.founderId && (
        <div className="hidden flex-col items-center gap-4 border-b border-border p-4 lg:flex">
          <Link
            className="w-full"
            href={`/venture/${venture.id}/edit`}
            passHref
          >
            <Button className="w-full">Edit</Button>
          </Link>
          <DeleteVentureButton id={venture.id} />

          <Link
            className=" text-center text-primary hover:cursor-pointer hover:underline"
            href={`/venture/${venture.id}/applications`}
          >
            View Applications
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Founder Information:</h2>
          <div>
            <p>
              <Link
                className="hover:underline"
                href={`/founder/${venture.founder.id}`}
              >
                {user.firstName} {user.lastName}
              </Link>
            </p>
            <p className="text-muted-foreground">
              Member since {venture.founder.createdAt.toLocaleDateString()}
            </p>
          </div>

          <MultiStar />
          <div>
            <p className="">{user.country}</p>
            <p className="text-muted-foreground">English</p>
          </div>
          <div>
            <p className="">
              {venture.founder.ventures.length} investments posted
            </p>
            <p className="text-muted-foreground">
              {openInvestments} open{" "}
              {venture.founder.ventures.length - openInvestments} closed
            </p>
          </div>
          <div>
            <p className="">{formatCurrency(totalSpent)} paid out</p>
            {paidInvesmtnets > 0 && (
              <p className="text-muted-foreground">
                Through {paidInvesmtnets} investment
                {paidInvesmtnets > 1 && "s"}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold">Verification:</h2>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="h-5 w-5 text-primary" />
            <p>Phone Number Verified</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="h-5 w-5 text-primary" />
            <p>ID Verified</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="h-5 w-5 text-primary" />
            <p>Payment Method Verified</p>
          </div>
        </div>
      </div>

      {venture.investor && user?.id !== venture.investorId && (
        <div className="flex h-32 grow flex-col p-6">
          <h2 className="pb-3 font-bold text-white">Investor Information:</h2>
          <div className="flex items-center">
            <p>
              <Link
                className="hover:text-muted-foreground"
                href={`/investor/${venture.investor.id}`}
              >
                {venture.investor.user.firstName}{" "}
                {venture.investor.user.lastName}
              </Link>
            </p>
            <ChatBubbleBottomCenterIcon className="ml-2 mt-1 h-5 w-5 text-blue-500 hover:cursor-pointer hover:text-blue-600" />
          </div>
          <p className="pb-4 text-muted-foreground">
            Member since {venture.investor.createdAt.toLocaleDateString()}
          </p>

          <p className="">{venture.investor.user.country}</p>
          <p className="pb-4 text-muted-foreground">English</p>
          <p className="">4 jobs completed</p>
          <p className="pb-4 text-muted-foreground">2 currently working</p>

          <h2 className="pt-8 font-bold text-white">Verification:</h2>
        </div>
      )}
    </div>
  );
};
