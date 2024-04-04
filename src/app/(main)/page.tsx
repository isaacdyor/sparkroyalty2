"use client";

import { Button } from "@/components/ui/button";
import { removeQuotesAndNewLines } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  const unparsedQuestion =
    '" What percent of revenue will be paid out for royalty payment 1?\nWhat is the payout for royalty payment 2?\nWhat percent of revenue will be paid out for royalty payment 3?"';
  console.log(unparsedQuestion);
  const parsedQuestion = removeQuotesAndNewLines(unparsedQuestion);
  console.log(parsedQuestion);
  return (
    <div className="flex flex-col items-center justify-center gap-10 pt-40">
      <h1 className="text-center text-7xl font-semibold">
        Introducing Spark Royalty
      </h1>
      <p className="text-center text-3xl font-semibold text-muted-foreground">
        The World&apos;s First Royalty Based Freelancing Marketplace
      </p>
      <Button>
        <Link href="/signup">Get Started</Link>
      </Button>

      <div className="absolute top-20 -z-10 h-full max-h-[36rem] w-full max-w-5xl rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}
