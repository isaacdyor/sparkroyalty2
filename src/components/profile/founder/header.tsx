import { getInitials } from "@/lib/utils";
import type { FounderWithUser } from "@/types/types";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";

export const FounderHeader: React.FC<{ founder: FounderWithUser }> = ({
  founder,
}) => {
  return (
    <div className="flex flex-col justify-between gap-8 border-b border-border p-8 md:flex-row">
      <div className="flex gap-4 ">
        <Avatar size="xl">
          <AvatarImage src={founder.user.imageUrl} />
          <AvatarFallback>
            {getInitials(founder.user.firstName, founder.user.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-4xl font-semibold">{`${founder.user.firstName} ${founder.user.lastName}`}</p>
          <div className="flex items-center gap-1">
            <MapPinIcon className="h-5 w-5 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              {founder.user.country}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Link href={`founder/${founder.id}`}>See Public View</Link>
        </Button>
        <Button variant="default">
          <Link href="profile/edit">Edit Profile</Link>
        </Button>
      </div>
    </div>
  );
};
