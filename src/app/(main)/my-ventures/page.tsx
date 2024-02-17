import { FounderDetail } from "@/components/founder/detail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MiniVenture } from "@/components/venture/my-ventures/miniVenture";
import { api } from "@/trpc/server";
import Link from "next/link";

const MyVentureListPage: React.FC = async () => {
  const ventures = await api.ventures.getCurrent.query();
  if (!ventures) return <p>You dont have any ventures</p>;
  return (
    <div className="flex justify-center px-8 py-12 md:p-14 lg:px-20">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-0">
          <h1 className="text-5xl font-semibold">My Ventures</h1>
          <Link href="venture/new" passHref>
            <Button>Create new venture</Button>
          </Link>
        </div>
        <div>
          <hr className="border-b-0.5 border-border" />
          {ventures.map((venture) => (
            <MiniVenture venture={venture} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyVentureListPage;
