"use client";

import { removeQuotesAndNewLines } from "@/lib/utils";

export default function HomePage() {
  const unparsedQuestion =
    '" What percent of revenue will be paid out for royalty payment 1?\nWhat is the payout for royalty payment 2?\nWhat percent of revenue will be paid out for royalty payment 3?"';
  console.log(unparsedQuestion);
  const parsedQuestion = removeQuotesAndNewLines(unparsedQuestion);
  console.log(parsedQuestion);
  return <>{"newX"}</>;
}
