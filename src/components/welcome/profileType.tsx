"use client";

import { ComputerDesktopIcon, LightBulbIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Card, CardTitle } from "../ui/card";

export default function ProfileType() {
  return (
    <div className="flex h-nav w-screen items-center justify-center pb-36 ">
      <div className="flex-col rounded-lg border border-border p-14">
        <h1 className="pb-12 text-center text-4xl font-semibold">
          Join as an Investor or a Founder
        </h1>
        <div className=" flex gap-8 ">
          <Link href="/investor/new">
            <Card className="flex w-72 max-w-2xl flex-col items-center gap-4 p-6 hover:bg-secondary">
              <CardTitle>Signup as an Investor</CardTitle>

              <ComputerDesktopIcon className="h-16 w-16 text-primary-foreground" />

              <p className="text-center">
                Invest your time and take a share of the profits!
              </p>
            </Card>
          </Link>
          <Link href="/founder/new">
            <Card className="flex w-72 max-w-2xl flex-col items-center gap-4 p-6 hover:bg-secondary">
              <CardTitle>Signup as a Founder</CardTitle>

              <LightBulbIcon className="h-16 w-16 text-primary-foreground" />

              <p className="text-center">
                Find the best talent and pay them when you make money!
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
