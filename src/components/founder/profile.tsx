import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { api } from "@/trpc/server";

export default async function FounderProfile() {
  const founder = await api.founders.getCurrent.query();

  if (!founder) return null;

  return (
    <div className="flex w-full justify-center ">
      <Card className="mt-12 w-full max-w-xl">
        <CardHeader>
          <CardTitle>
            {founder.firstName} {founder.lastName}
          </CardTitle>
          <CardDescription>{founder.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Bio: {founder.bio}</p>
        </CardContent>
        <CardContent>
          <p>Country: {founder.country}</p>
        </CardContent>
      </Card>
    </div>
  );
}
