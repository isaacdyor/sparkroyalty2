import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/utils";
import { api } from "@/trpc/server";

export default async function investorPage() {
  const investor = await api.investors.getCurrent.query();

  if (!investor) return null;

  return (
    <div className="flex w-full justify-center ">
      <Card className="mt-12 w-full max-w-xl">
        <CardHeader>
          <CardTitle>
            {investor.firstName} {investor.lastName}
          </CardTitle>
          <CardDescription>{investor.email}</CardDescription>
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
      </Card>
    </div>
  );
}
