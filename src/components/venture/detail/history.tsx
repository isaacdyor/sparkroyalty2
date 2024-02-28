import { timeAgo } from "@/lib/utils";
import type { Venture } from "@prisma/client";
import Link from "next/link";
import { Status } from "../status";

export const FounderHistory: React.FC<{ ventures: Venture[] }> = ({
  ventures,
}) => {
  if (!ventures) return null;
  return (
    <div className=" flex flex-col gap-8 rounded-lg border-border p-8 md:border">
      <p className="text-2xl font-semibold">Founder history</p>
      {ventures.map((venture, index) => (
        <div key={index} className={`flex flex-col gap-4 `}>
          <hr className="border-t border-border" />
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex items-center gap-2">
              <Link href={`/venture/${venture.id}`} passHref>
                <p className="text-lg hover:underline">{venture.title}</p>
              </Link>
              <Status status={venture.status} />
            </div>

            <p className="text-md text-muted-foreground">
              {timeAgo(venture.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
