import { api } from "@/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

export default async function FounderProfile() {
  const founder = await api.founders.getCurrent.query();

  if (!founder) return null;

  return (
    <div className="flex w-full justify-center p-14">
      <div className="w-full rounded-lg border border-border">
        <div className="flex items-center p-4">
          <Avatar size="xl">
            <AvatarImage src={founder.user.imageUrl} />
            <AvatarFallback>
              {getInitials(founder.user.firstName, founder.user.lastName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
