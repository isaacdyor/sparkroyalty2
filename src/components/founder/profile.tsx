import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { api } from "@/trpc/server";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function FounderProfile() {
  const founder = await api.founders.getCurrent.query();

  if (!founder) return null;

  return (
    <div className="flex w-full justify-center ">
      <Card className="mt-12 w-full max-w-xl">
        <CardHeader>
          <CardTitle>
            {founder.user.firstName} {founder.user.lastName}
          </CardTitle>
          <CardDescription>{founder.user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Bio: {founder.bio}</p>
        </CardContent>
        <CardContent>
          <p>Country: {founder.country}</p>
        </CardContent>
        <Link href="/profile/edit">
          <Button className="w-full">Edit</Button>
        </Link>
      </Card>
    </div>
  );
}
