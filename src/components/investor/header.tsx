import type { InvestorWithUser } from "@/types/types";
import React from "react";
import { getInitials } from "@/lib/utils";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const InvestorHeader: React.FC<{ investor: InvestorWithUser }> = ({
  investor,
}) => {
  return (
    <div className="flex flex-col justify-between gap-8 border-b border-border p-8 md:flex-row">
      <div className="flex gap-4 ">
        <Avatar size="xl">
          <AvatarImage src={investor.user.imageUrl} />
          <AvatarFallback>
            {getInitials(investor.user.firstName, investor.user.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-4xl font-semibold">{`${investor.user.firstName} ${investor.user.lastName}`}</p>
          <div className="flex items-center gap-1">
            <MapPinIcon className="h-5 w-5 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              {investor.user.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
