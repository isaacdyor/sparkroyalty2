import { CheckBadgeIcon } from "@heroicons/react/24/solid";

import { InvestorWithUser } from "@/types/types";
import LinkedAccount from "../profile/linkedAccount";

export const SideBar: React.FC<{ investor: InvestorWithUser }> = async ({
  investor,
}) => {
  const linkedAccounts = [
    {
      imageUrl: investor.user.imageUrl,
      firstName: investor.user.firstName,
      lastName: investor.user.lastName,
      account: "Github",
      accountUrl: "https://github.com/isaacdyor",
    },
    {
      imageUrl: investor.user.imageUrl,
      firstName: investor.user.firstName,
      lastName: investor.user.lastName,
      account: "LinkedIn",
      accountUrl: "https://www.linkedin.com/in/isaac-dyor/",
    },
  ];

  return (
    <div className="flex w-1/3 flex-col gap-2 border-r border-border">
      <div className="flex items-center justify-between border-b border-border  p-8">
        <div className="flex flex-col">
          <p className="text-2xl">$10k+</p>
          <p className="text-muted-foreground">Total Earnings</p>
        </div>
        <div className="flex flex-col">
          <p className="text-2xl">6</p>
          <p className="text-muted-foreground">Total Jobs</p>
        </div>
        <div className="flex flex-col">
          <p className="text-2xl">2</p>
          <p className="text-muted-foreground">Current Jobs</p>
        </div>
      </div>
      <div className="flex flex-col gap-10 p-8">
        <div className="flex flex-col">
          <p className="pb-1 text-2xl font-semibold">Languages:</p>
          <p className="text-lg">
            English:{" "}
            <span className="text-muted-foreground">Native or Billingual</span>
          </p>
        </div>
        <div className="flex flex-col">
          <p className="pb-1 text-2xl font-semibold">Verifications:</p>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="h-5 w-5 text-primary" />
            <p className="text-lg">Phone Number: Verified</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckBadgeIcon className="h-5 w-5 text-primary" />
            <p className="text-lg">ID: Verified</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="pb-1 text-2xl font-semibold">Education:</p>
          <p className="text-lg">Univeristy of Washington</p>
          <p className="text-lg text-muted-foreground">
            Computer Science (B.S.)
          </p>
          <p className="text-lg text-muted-foreground">2023-2027</p>
        </div>
        <div className="flex flex-col">
          <p className="pb-1 text-2xl font-semibold">Linked Accounts:</p>
          <div className="flex flex-col gap-2">
            {linkedAccounts.map((account) => (
              <LinkedAccount account={account} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
