import { api } from "@/trpc/server";
import { InvestorForm, type NewInvestorInput } from "./form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getActive } from "@/utils/getActive";
import { ActiveType } from "@prisma/client";

export async function EditInvestor() {
  const investor = await api.investors.getCurrent.query();
  const router = useRouter();
  const active = await getActive();

  if (!investor || active !== ActiveType.INVESTOR) return null;

  const onSubmit = async (data: NewInvestorInput) => {
    try {
      await api.investors.update.mutate({
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

  return <InvestorForm investor={investor} onSubmit={onSubmit} />;
}
