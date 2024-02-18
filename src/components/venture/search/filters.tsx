import { VentureApplicationUser } from "@/server/api/routers/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

export const Filters: React.FC<{
  setVentures: React.Dispatch<React.SetStateAction<VentureApplicationUser[]>>;
}> = ({ setVentures }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-80">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between space-x-4 rounded-lg px-4 hover:cursor-pointer hover:bg-secondary/50">
            <h4 className="text-sm font-semibold">Category</h4>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronDown
                className={`h-4 w-4 transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/primitives
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
