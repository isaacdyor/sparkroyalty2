import { Button } from "@/components/ui/button";
import React from "react";

export const ApplicationButtons = () => {
  return (
    <>
      <Button className="w-full bg-transparent px-6" variant="outline">
        Message
      </Button>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          e.preventDefault();
          console.log("Hire");
        }}
        className="w-full px-6"
      >
        Hire
      </Button>
    </>
  );
};
