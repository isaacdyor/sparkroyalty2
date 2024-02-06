import { FullVenture } from "@/types/types";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import { VentureStatusType, ActiveType } from "@prisma/client";
import { Button } from "../../ui/button";
import Link from "next/link";
import { DeleteVentureButton } from "./deleteVenture";

export const VentureDetailSide: React.FC<{ venture: FullVenture }> = ({
  venture,
}) => {
  const user = venture.founder.user;

  return (
    <div className="flex h-full w-1/4 flex-col">
      {venture.status === VentureStatusType.PENDING && (
        <>
          {user.active === ActiveType.INVESTOR && (
            <div className="flex flex-col gap-4 border border-transparent border-b-border p-4">
              <Link href={`/investments/${venture.id}/apply`} passHref>
                <Button className="w-full">Apply</Button>
              </Link>

              <Button variant="outline">Message</Button>
              <div className="flex items-center justify-center text-primary hover:cursor-pointer hover:underline">
                <BookmarkIcon className="h-5 w-5 pr-1 underline" />
                <p>Save Investment</p>
              </div>
            </div>
          )}
          {user.active === ActiveType.FOUNDER &&
            user.id === venture.founderId && (
              <div className="flex flex-col gap-4 border border-transparent border-b-border  p-4">
                <Link href={`/investments/${venture.id}/edit`} passHref>
                  <Button className="w-full">Edit</Button>
                </Link>
                <DeleteVentureButton id={venture.id} />

                <Link
                  className=" text-center text-primary hover:cursor-pointer hover:underline"
                  href={`/investments/${venture.id}/applications`}
                >
                  View Applications
                </Link>
              </div>
            )}
        </>
      )}
      {venture.status === VentureStatusType.BUILDING &&
        user.active === ActiveType.INVESTOR &&
        user?.id === venture.investorId && (
          <div className="flex flex-col border border-transparent border-b-border  p-4">
            <div className="pb-4 ">
              {/* <CompleteJobButton investment={venture} /> */}
              <Button>Complete Job</Button>
            </div>
            <button className="rounded-full border border-blue-500 p-2 font-semibold text-blue-500 hover:bg-blue-500 hover:bg-opacity-10">
              Message
            </button>
          </div>
        )}

      {venture.status === VentureStatusType.PAYOUT &&
        user.active === ActiveType.FOUNDER &&
        user.id === venture.founderId && (
          <div className="flex flex-col border border-transparent border-b-border  p-4">
            <Link href={`/investments/${venture.id}/reports/create`}>
              <button className="mb-4 w-full rounded-full bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600">
                Pay Investor
              </button>
            </Link>
            <button className="rounded-full border border-blue-500 p-2 font-semibold text-blue-500 hover:bg-blue-500 hover:bg-opacity-10">
              Message
            </button>
          </div>
        )}
      {venture.status === VentureStatusType.COMPLETED && (
        <>
          {user.active === ActiveType.FOUNDER &&
            user?.id === venture.founderId && (
              <div className="flex flex-col border border-transparent border-b-neutral-500  p-4">
                <Link href={`/investor/${venture.investor!.id}/review`}>
                  <button className="mb-4 w-full rounded-full bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600">
                    Review Investor
                  </button>
                </Link>
                <button className="rounded-full border border-blue-500 p-2 font-semibold text-blue-500 hover:bg-blue-500 hover:bg-opacity-10">
                  Message
                </button>
              </div>
            )}
          {user.active === ActiveType.INVESTOR &&
            user?.id === venture.investorId && (
              <div className="flex flex-col border border-transparent border-b-neutral-500  p-4">
                <Link href={`/founder/${venture.founder!.id}/review`}>
                  <button className="mb-4 w-full rounded-full bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600">
                    Review Founder
                  </button>
                </Link>
                <button className="rounded-full border border-blue-500 p-2 font-semibold text-blue-500 hover:bg-blue-500 hover:bg-opacity-10">
                  Message
                </button>
              </div>
            )}
        </>
      )}

      {user?.id !== venture.founderId && (
        <div
          className={`flex border border-transparent ${
            venture.investor ? "border-b-neutral-500" : "grow"
          }  flex-col p-6`}
        >
          <h2 className="pb-3 font-bold text-white">Founder Information:</h2>
          <div className="flex items-center">
            <p>
              <Link
                className="hover:text-muted-foreground"
                href={`/founder/${venture.founder.id}`}
              >
                {user.firstName} {user.lastName}
              </Link>
            </p>
            <ChatBubbleBottomCenterIcon className="ml-2 mt-1 h-5 w-5 text-blue-500 hover:cursor-pointer hover:text-blue-600" />
          </div>

          <p className="pb-4 text-muted-foreground">
            Member since {venture.founder.createdAt.toLocaleDateString()}
          </p>
          {/* <div className="flex pb-5">
          <MultiStarsComponent reviews={venture.founder.reviews} />
          {venture.founder.reviews.length > 0 && (
            <Link href={`/founder/${venture.founder.id}/reviews`}>
              <p className="ml-1 hover:text-muted-foreground">
                ({venture.founder.reviews.length})
              </p>
            </Link>
          )}
        </div> */}
          <p className="">{user.country}</p>
          <p className="pb-4 text-muted-foreground">English</p>
          {/* <p className="">
          {venture.founder.ventures.length} investments posted
        </p>
        <p className="pb-4 text-muted-foreground">
          {openInvestments} open{" "}
          {venture.founder.investments.length - openInvestments} closed
        </p>

        <p className="">{formatCurrency(totalSpent)} paid out</p>
        {paidInvesmtnets > 0 && (
          <p className="pb-5 text-muted-foreground">
            Through {paidInvesmtnets} investment
            {paidInvesmtnets > 1 && "s"}
          </p>
        )} */}
          <h2 className="pt-8 font-bold text-white">Verification:</h2>
        </div>
      )}

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
          {/* <div className="flex pb-5">
          <MultiStarsComponent reviews={venture.investor.reviews} />
          {venture.investor.reviews.length > 0 && (
            <Link href={`/investor/${venture.investor.id}/reviews`}>
              <p className="ml-1 hover:text-muted-foreground">
                ({venture.investor.reviews.length ?? 0})
              </p>
            </Link>
          )}
        </div> */}
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
