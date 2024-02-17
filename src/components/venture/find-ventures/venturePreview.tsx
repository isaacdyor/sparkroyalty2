import { timeAgo } from "@/lib/utils";
import { Venture } from "@prisma/client";
import Link from "next/link";

export const VenturePreview: React.FC<{ venture: Venture }> = ({ venture }) => {
  return (
    <div className="w-full border-b border-border py-6 ">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row lg:gap-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link href={`/venture/${venture.id}`} passHref>
              <h2 className="text-2xl hover:underline">{venture.title}</h2>
            </Link>
          </div>

          <p className="text-muted-foreground">{timeAgo(venture.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};
