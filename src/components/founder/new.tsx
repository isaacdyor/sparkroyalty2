"use client";

import { FounderForm, NewFounderInput } from "@/components/founder/form";
import { capitalizeFirstLetter } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ActiveType, MetadataType } from "@/types/types";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type NewFounderProps = {
  metadata: MetadataType;
};

export default async function NewFounderForm({ metadata }: NewFounderProps) {
  const router = useRouter();
  const supabase = createClient();

  const { mutate } = api.founders.create.useMutation({
    onSuccess: async () => {
      const { error } = await supabase.auth.updateUser({
        data: {
          active: ActiveType.FOUNDER,
          investor: metadata.investor,
          founder: true,
        },
      });
      if (!error) {
        toast.success("Founder profile created!");
        router.push("/profile");
      } else {
        toast.error("Error creating founder profile");
      }
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error creating founder profile:", errorMessage);
      toast.error("Error creating founder profile");
    },
  });

  const onSubmit = async (data: NewFounderInput) => {
    mutate({
      firstName: capitalizeFirstLetter(data.firstName),
      lastName: capitalizeFirstLetter(data.lastName),
      bio: data.bio,
      country: data.country,
      educationAndExperience: data.educationAndExperience,
    });
  };

  return <FounderForm metadata={metadata} onSubmit={onSubmit} />;
}
