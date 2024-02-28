import { CheckBadgeIcon } from "@heroicons/react/24/solid";

import type { FounderWithUser } from "@/types/types";
import LinkedAccount from "../linkedAccount";
import React from "react";

export const FounderSideBar: React.FC<{ founder: FounderWithUser }> = ({
  founder,
}) => {
  const linkedAccounts = [
    {
      imageUrl: founder.user.imageUrl,
      firstName: founder.user.firstName,
      lastName: founder.user.lastName,
      account: "Github",
      accountUrl: "https://github.com/isaacdyor",
    },
    {
      imageUrl: founder.user.imageUrl,
      firstName: founder.user.firstName,
      lastName: founder.user.lastName,
      account: "LinkedIn",
      accountUrl: "https://www.linkedin.com/in/isaac-dyor/",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2 border-border lg:w-96 lg:border-r">
      <div className="flex items-center justify-between border-b border-border p-8 md:justify-normal md:gap-6 lg:justify-between lg:gap-2">
        <div className="flex flex-col">
          <p className="text-2xl">$10k+</p>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>
        <div className="flex flex-col">
          <p className="text-2xl">6</p>
          <p className="text-sm text-muted-foreground">Total Ventures</p>
        </div>
        <div className="flex flex-col">
          <p className="text-2xl">2</p>
          <p className="text-sm text-muted-foreground">Current Ventures</p>
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
              <React.Fragment key={account.account}>
                <LinkedAccount account={account} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
