import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import { LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Account = {
  imageUrl: string;
  firstName: string;
  lastName: string;
  account: string;
  accountUrl: string;
};

const LinkedAccount: React.FC<{ account: Account }> = ({ account }) => {
  return (
    <div className="flex flex-col rounded-lg border border-border p-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-2xl">{account.account}</p>
          <p className="pb-4 text-lg text-muted-foreground">{`${account.firstName} ${account.lastName}`}</p>
        </div>
        <Avatar size="lg">
          <AvatarImage src={account.imageUrl} />
          <AvatarFallback>
            {getInitials(account.firstName, account.lastName)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-1">
        <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
        <Link
          href={account.accountUrl}
          className="text-primary hover:underline"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default LinkedAccount;
