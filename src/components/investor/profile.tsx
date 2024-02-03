import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { api } from "@/trpc/server";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function InvestorProfile() {
  const investor = await api.investors.getCurrent.query();

  if (!investor) return null;

  return (
    <div className="flex w-full justify-center ">
      <Card className="mt-12 w-full max-w-xl">
        <CardHeader>
          <CardTitle>
            {investor.user.firstName} {investor.user.lastName}
          </CardTitle>
          <CardDescription>{investor.user.email}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center">
          <p className="pr-1">Skills:</p>
          {investor.skills.map((skill, index) => (
            <p
              key={index}
              className="w-min rounded-full border border-border px-2 py-0.5"
            >
              {skill}
            </p>
          ))}
        </CardContent>
        <CardContent>
          <p>Bio: {investor.bio}</p>
        </CardContent>
        <div className="flex">
          <CardContent>
            <p>Github: {investor.github}</p>
          </CardContent>
          <CardContent>
            <p>Linkedin: {investor.linkedin}</p>
          </CardContent>
          <CardContent>
            <p>Website: {investor.website}</p>
          </CardContent>
        </div>
        <Link href="/profile/edit">
          <Button className="w-full">Edit</Button>
        </Link>
      </Card>
    </div>
  );
}
