import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { api } from "@/trpc/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FindVentureSide: React.FC = async () => {
  const investor = await api.investors.getCurrent.query();
  if (!investor) return null;
  return (
    <div className=" hidden flex-col gap-8 xl:flex">
      <div className="flex w-80 flex-col items-start gap-4 rounded-lg bg-secondary/50 p-4">
        <div className="flex gap-4">
          <Avatar size="lg">
            <AvatarImage src={investor.user.imageUrl} />
            <AvatarFallback>
              {getInitials(investor.user.firstName, investor.user.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-lg">
              {investor.user.firstName} {investor.user.lastName}
            </p>
            <p className="text-muted-foreground">Software Engineer</p>
          </div>
        </div>

        <p className="text-primary underline hover:cursor-pointer">
          Complete your profile
        </p>
        <div className="flex items-center">
          <div className="h-1 w-48 rounded-l-full bg-primary"></div>
          <div className="h-1 w-12 rounded-r-full bg-secondary"></div>
          <p className="pl-4 text-xs">70%</p>
        </div>
      </div>
      <div className="w-80 rounded-lg bg-secondary/50 px-4 py-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Connects</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <p>Available: 50</p>
                <div className="flex items-center gap-1">
                  <p className="text-primary underline hover:cursor-pointer">
                    View Details
                  </p>
                  <p className="text-border">|</p>
                  <p className="text-primary underline hover:cursor-pointer">
                    Buy Connects
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Preferences</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Proposals</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-0" value="item-4">
            <AccordionTrigger>Project Dashboard</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
