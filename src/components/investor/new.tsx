"use client";

import { api } from "@/trpc/react";
import { InvestorForm, NewInvestorInput } from "./form";
import { ActiveType, MetadataType } from "@/types/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

type EditInvestorProps = {
  metadata: MetadataType;
};

export async function NewInvestorForm({ metadata }: EditInvestorProps) {
  const router = useRouter();
  const supabase = createClient();

  const { mutate } = api.investors.create.useMutation({
    onSuccess: async () => {
      const { error } = await supabase.auth.updateUser({
        data: {
          active: ActiveType.INVESTOR,
          investor: true,
          founder: metadata.founder,
        },
      });
      if (!error) {
        toast.success("Investor profile created!");
        router.push("/profile");
      } else {
        toast.error("Error creating investor profile");
      }
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error creating investor profile:", errorMessage);
      toast.error("Error creating investor profile");
    },
  });

  const onSubmit = async (data: NewInvestorInput) => {
    mutate({
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
  };

  return <InvestorForm metadata={metadata} onSubmit={onSubmit} />;
}
