import { timeAgo, formatCurrency } from "@/lib/utils";
import { FullVenture } from "@/types/types";
import { VentureStatusType } from "@prisma/client";

export const VentureDetailMain: React.FC<{ venture: FullVenture }> = ({
  venture,
}) => {
  const payoutPercent = (venture.currentPayout / venture.totalPayout) * 100;
  return (
    <div className="flex w-3/4 flex-col">
      <div className="flex flex-col border border-transparent border-b-border border-r-border  p-6">
        <div className="flex items-center pb-6">
          <h2 className="pr-4 text-2xl font-bold text-white ">
            {venture.title}
          </h2>
          {venture.status === VentureStatusType.PENDING && (
            <p className="rounded-full bg-blue-400 px-3  text-center text-white">
              Open
            </p>
          )}
          {(venture.status === VentureStatusType.BUILDING ||
            venture.status === VentureStatusType.PAYOUT) && (
            <p className="rounded-full bg-blue-400 px-3 text-center text-white">
              In progress
            </p>
          )}

          {venture.status === VentureStatusType.COMPLETED && (
            <p className="rounded-full bg-blue-400 px-3  text-center text-white">
              Completed
            </p>
          )}
        </div>
        <p className="text-muted-foreground">
          Posted {timeAgo(venture.createdAt)}
        </p>
      </div>
      <div className="flex flex-col border border-transparent border-b-border border-r-border p-6">
        <h2 className="pb-2 font-bold text-white">Company Description:</h2>
        <p className="text-white">{venture.description}</p>
      </div>
      <div className="flex h-24 justify-between border border-transparent border-b-border border-r-border p-6">
        <div className="flex flex-col">
          <p className="text-muted-foreground">Roytalty Rate:</p>
          <p>{venture.percent}%</p>
        </div>
        <div className="flex flex-col">
          <p className="text-muted-foreground">Total Payout:</p>
          <p>{formatCurrency(venture.totalPayout)}</p>
        </div>
      </div>
      <div className="flex flex-col border border-transparent border-b-border border-r-border p-6">
        <h2 className="pb-2 font-bold text-white">Current Payout:</h2>
        <div className="flex items-center">
          <div className="mr-4 h-4 w-full rounded-full bg-secondary">
            {payoutPercent > 0 && (
              <div
                style={{ width: payoutPercent + "%" }}
                className={` h-full  ${
                  payoutPercent == 100 && "rounded-full"
                } rounded-l-full bg-blue-500`}
              ></div>
            )}
          </div>
          <p>
            {formatCurrency(venture.currentPayout)}/
            {formatCurrency(venture.totalPayout)}
          </p>
        </div>
      </div>
      <div className="flex flex-col border border-transparent border-b-border border-r-border p-6">
        <h2 className="pb-2 font-bold text-white">Services Needed:</h2>
        <p className="text-white">{venture.workDescription}</p>
      </div>
      <div className="flex flex-col border border-transparent border-r-border p-6">
        <div className="w-1/2">
          <h2 className="pb-2 font-bold text-white">Recommended Skills:</h2>
          <div className="mt-2 flex flex-wrap ">
            {venture.skills?.map((skill, index) => (
              <p
                className="mb-1 mr-1 rounded-2xl bg-secondary p-1 px-2"
                key={index}
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
