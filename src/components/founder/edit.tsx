import { api } from "@/trpc/server";
import { FounderForm, type NewFounderInput } from "./form";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getActive } from "@/utils/getActive";
import { ActiveType } from "@prisma/client";

export async function EditFounder() {
  const founder = await api.founders.getCurrent.query();
  const router = useRouter();
  const active = await getActive();

  if (!founder || active !== ActiveType.FOUNDER) return null;

  const onSubmit = async (data: NewFounderInput) => {
    try {
      await api.founders.update.mutate({
        firstName: capitalizeFirstLetter(data.firstName),
        lastName: capitalizeFirstLetter(data.lastName),
        bio: data.bio,
        country: data.country,
        educationAndExperience: data.educationAndExperience,
      });
      router.push("/profile");
    } catch {
      toast.error("Error creating founder profile");
    }
  };

  return <FounderForm founder={founder} onSubmit={onSubmit} />;
}