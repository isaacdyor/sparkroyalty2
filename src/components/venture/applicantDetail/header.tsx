import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { ApplicationVenture } from "@/server/api/routers/types";
import { InvestorWithUser } from "@/types/types";
import { HandThumbDownIcon, HeartIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const ApplicantDetailHeader: React.FC<{
  application: ApplicationVenture;
}> = ({ application }) => {
  const applicant = application.investor;
  return (
    <div className="flex flex-col gap-6 border-b border-border p-6">
      <div className="flex gap-8 ">
        <Avatar size="xl">
          <AvatarImage src={applicant.user.imageUrl} />
          <AvatarFallback>
            {getInitials(applicant.user.firstName, applicant.user.lastName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col">
            <Link href={`/investor/${applicant.id}`}>
              <p className="text-3xl font-semibold hover:underline ">
                {applicant.user.firstName} {applicant.user.lastName}
              </p>
            </Link>
            <div className="flex items-center gap-0.5">
              <MapPinIcon className="h-5 w-5 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                {applicant.user.country}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="hidden gap-2 md:flex">
                <div className="rounded-full p-2 hover:cursor-pointer hover:bg-secondary">
                  <HandThumbDownIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="rounded-full p-2 hover:cursor-pointer hover:bg-secondary">
                  <HeartIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>

              <div className="hidden w-40 flex-col gap-2 sm:flex md:flex-row">
                <Button className="w-full bg-transparent" variant="outline">
                  Message
                </Button>
                <Button className="w-full px-6">Hire</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 sm:hidden">
        <Button className="w-full bg-transparent" variant="outline">
          Message
        </Button>
        <Button className="w-full px-6">Hire</Button>
      </div>
    </div>
  );
};
