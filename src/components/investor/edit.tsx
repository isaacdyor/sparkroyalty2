import { api } from "@/trpc/server";
import { InvestorForm, NewInvestorInput } from "./form";
import { getMetadata } from "@/utils/metadata/client";
import { ActiveType } from "@/types/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export async function EditInvestorPage() {
  const investor = await api.investors.getCurrent.query();
  const router = useRouter();
  const metadata = await getMetadata();

  if (!investor || metadata.active !== ActiveType.INVESTOR) return null;

  const onSubmit = async (data: NewInvestorInput) => {
    try {
      await api.investors.update.mutate({
        firstName: capitalizeFirstLetter(data.firstName),
        lastName: capitalizeFirstLetter(data.lastName),
        bio: data.bio,
        skills: data.skills,
        country: data.country,
        educationAndExperience: data.educationAndExperience,
        github: data.github,
        linkedin: data.linkedin,
        website: data.website,
      });
      router.push("/profile");
    } catch {
      toast.error("Error creating investor profile");
    }
  };

  return (
    <InvestorForm investor={investor} metadata={metadata} onSubmit={onSubmit} />
  );
}
