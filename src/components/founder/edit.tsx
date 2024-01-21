import { api } from "@/trpc/server";
import { FounderForm, NewFounderInput } from "./form";
import { getMetadata } from "@/utils/metadata/client";
import { ActiveType } from "@/types/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export async function EditFounder() {
  const founder = await api.founders.getCurrent.query();
  const router = useRouter();
  const metadata = await getMetadata();

  if (!founder || metadata.active !== ActiveType.FOUNDER) return null;

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

  return (
    <FounderForm founder={founder} metadata={metadata} onSubmit={onSubmit} />
  );
}
