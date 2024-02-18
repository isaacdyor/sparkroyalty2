import { FullVenture } from "@/types/types";
import {
  ChatBubbleBottomCenterIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { VentureStatusType } from "@prisma/client";
import Link from "next/link";

import { formatCurrency } from "@/lib/utils";
import { MultiStar } from "../multiStar";
import { VentureDetailPendingActions } from "./actions";

export const VentureDetailPendingSide: React.FC<{
  venture: FullVenture;
}> = ({ venture }) => {
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
      <div className="hidden lg:block">
        <VentureDetailPendingActions venture={venture} />
      </div>

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
