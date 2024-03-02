import {
  ChatBubbleBottomCenterIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { VentureStatusType } from "@prisma/client";
import Link from "next/link";

import { formatCurrency } from "@/lib/utils";
import type { VentureApplicationUser } from "@/server/api/routers/types";
import { MultiStar } from "../multiStar";
import { VentureDetailBuildingActions } from "./actions";

export const VentureDetailBuildingSide: React.FC<{
  venture: VentureApplicationUser;
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

  const investor = venture.investor!;

  return (
    <div className="flex w-full shrink-0 flex-col lg:w-80">
      <div className="hidden lg:block">
        <VentureDetailBuildingActions venture={venture} />
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
          </div>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="h-5 w-5 text-primary" />
            <p>Phone Number Verified</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="h-5 w-5 text-primary" />
            <p>Payment Method Verified</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Investor Information:</h2>
          <div>
            <p>
              <Link
                className="hover:underline"
                href={`/investor/${investor.id}`}
              >
                {investor.user.firstName} {investor.user.lastName}
              </Link>
            </p>
            <p className="text-muted-foreground">
              Member since {investor.createdAt.toLocaleDateString()}
            </p>
          </div>

          <MultiStar />
          <div>
            <p className="">{investor.user.country}</p>
            <p className="text-muted-foreground">English</p>
          </div>
          <div>
            <p className="">Joined 2 ventures</p>
            <p className="text-muted-foreground">
              {openInvestments} building{" "}
              {venture.founder.ventures.length - openInvestments} completed
            </p>
          </div>
          <div>
            <p className="">{formatCurrency(totalSpent)} recieved</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="h-5 w-5 text-primary" />
            <p>Phone Number Verified</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="h-5 w-5 text-primary" />
            <p>Payment Method Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
};
